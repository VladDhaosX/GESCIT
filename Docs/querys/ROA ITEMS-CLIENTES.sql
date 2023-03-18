ALTER PROCEDURE [dbo].[SPSSiteCustomerItems]
	@IdSite NVARCHAR(10),
	@IdCustomer NVARCHAR(20)
AS
BEGIN
	SET NOCOUNT ON;

    SELECT I.[Id], [Name], [Unit], [SecondaryUnit]
	FROM [ROA].[dbo].[Item] I
		INNER JOIN SiteItems SI ON I.Id = SI.ItemId
			AND SI.SiteId = @IdSite
			AND SI.Active = 1
		INNER JOIN CustomerItem CI ON I.Id = CI.ItemId
			AND CI.CustomerId = @IdCustomer
END

GO

SELECT * FROM Item
SELECT * FROM SiteItems
SELECT * FROM CustomerItem
GO

-- =============================================
-- Author:		Miguel García
-- Create date: 03 Nov 2020
-- Description:	Synchronize Item
-- =============================================
ALTER PROCEDURE [dbo].[SynchronizeItem]
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE IT
	SET IT.Name = AXIT.Name,
		IT.Unit = AXIT.Unit,
		IT.SecondaryUnit = AXIT.SecondaryUnit
	FROM Item IT
		INNER JOIN (
			SELECT IT.ITEMID Id, IT.NAMEALIAS Name
				,im.unitid Unit
				,IM.IA_UnidadSecundaria SecondaryUnit
			FROM [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.AgreementHeader ah
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.EcoResProductCategory epC on ah.TI_GRUPOPRODUCTOS = epC.Category
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.ECORESPRODUCT EP ON epC.PRODUCT = EP.RECID
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.INVENTTABLE IT ON EP.RECID = IT.PRODUCT
					AND it.TI_CONFARTICULOS = 0
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.InventTableModule IM ON IT.ITEMID =IM.ITEMID
					AND IM.MODULETYPE = 0
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.TI_COTIZACIONUNIDADNEGOCIO cun on ah.RECID = cun.IZT_PURCHAGREEMENTHEADER
					AND cun.SITEID in ('001','001LC')
			WHERE AgreementClassification IN (5637144578,5637145326,5637144577,5637145328)
				AND AH.DefaultAgreementLineExpirationDate >= CONVERT(DATE, GETDATE())
				AND AgreementState = 1
			GROUP BY IT.ITEMID, IT.NAMEALIAS, im.unitid, IM.IA_UnidadSecundaria
		)AXIT ON IT.Id = AXIT.Id COLLATE Modern_Spanish_CI_AS
	
	INSERT Item([Id], [Name], [Unit], [SecondaryUnit])
	SELECT AXIT.[Id], AXIT.[Name], AXIT.[Unit], AXIT.[SecondaryUnit]
	FROM (
			SELECT IT.ITEMID Id, IT.NAMEALIAS Name
				,im.unitid Unit
				,IM.IA_UnidadSecundaria SecondaryUnit
			FROM [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.AgreementHeader ah
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.EcoResProductCategory epC on ah.TI_GRUPOPRODUCTOS = epC.Category
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.ECORESPRODUCT EP ON epC.PRODUCT = EP.RECID
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.INVENTTABLE IT ON EP.RECID = IT.PRODUCT
					AND it.TI_CONFARTICULOS = 0
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.InventTableModule IM ON IT.ITEMID =IM.ITEMID
					AND IM.MODULETYPE = 0
				INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.TI_COTIZACIONUNIDADNEGOCIO cun on ah.RECID = cun.IZT_PURCHAGREEMENTHEADER
					AND cun.SITEID in ('001','001LC')
			WHERE AgreementClassification IN (5637144578,5637145326,5637144577,5637145328)
				AND AH.DefaultAgreementLineExpirationDate >= CONVERT(DATE, GETDATE())
				AND AgreementState = 1
			GROUP BY IT.ITEMID, IT.NAMEALIAS, im.unitid, IM.IA_UnidadSecundaria
		)AXIT 
		LEFT JOIN Item IT ON AXIT.Id = IT.Id COLLATE Modern_Spanish_CI_AS
	WHERE IT.Id IS NULL
END

GO
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- =============================================
-- Author:		Miguel García
-- Create date: 03 Nov 2020
-- Description:	Synchronize Customers
-- =============================================
ALTER PROCEDURE [dbo].[SynchronizeCustomer]
AS
BEGIN
	SET NOCOUNT ON;
	
	INSERT Customer([Id], [Name], [Active], UseProducers, Blocked)
	SELECT CAX.Id, CAX.Name, 1, 0, ISNULL(CAX.Blocked, 1)
	FROM (
		SELECT CT.Id, DPT.Name [Name], Blocked
			FROM (
					SELECT ACCOUNTNUM AS Id, PARTITION, PARTY, VATNUM AS RFC, CLELIMITECERTIFICACION AS LimiteCertificacion
						, IZT_BUSINESSGROUPID AS IdGpoEmpresarial, 1 AS IdEstatusCliente, GRWBLOCKCARTERA Blocked
					FROM SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.CUSTTABLE
					WHERE DATAAREAID ='ALM' 
				) CT
				INNER JOIN SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.AgreementHeader AH ON CT.Id = AH.VendAccount
					AND AH.DefaultAgreementLineExpirationDate >= CONVERT(DATE, GETDATE())
					AND AgreementClassification IN(5637144578,5637145326,5637144577,5637145328) -- manufactura (5637144578,5637145326)
					AND AgreementState = 1
				LEFT OUTER JOIN SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.DIRPARTYTABLE DPT ON (CT.PARTY=DPT.RECID 
					AND (ct.PARTITION = DPT.PARTITION)) 	
			GROUP BY CT.Id, DPT.Name, Blocked
		)CAX
		LEFT JOIN Customer C ON CAX.Id = C.Id COLLATE Modern_Spanish_CI_AS
	WHERE C.Id IS NULL

	UPDATE C
	SET C.Name = CAX.Name,
		C.Active = 1,
		c.Blocked = ISNULL(CAX.Blocked, 1)
	FROM Customer C 
		INNER JOIN (
			SELECT CT.Id, DPT.Name [Name], Blocked
			FROM (
					SELECT ACCOUNTNUM AS Id, PARTITION, PARTY, VATNUM AS RFC, CLELIMITECERTIFICACION AS LimiteCertificacion
						, IZT_BUSINESSGROUPID AS IdGpoEmpresarial, 1 AS IdEstatusCliente, GRWBLOCKCARTERA Blocked
					FROM SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.CUSTTABLE
					WHERE DATAAREAID ='ALM' 
				) CT
				INNER JOIN SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.AgreementHeader AH ON CT.Id = AH.VendAccount
					AND AH.DefaultAgreementLineExpirationDate >= CONVERT(DATE, GETDATE())
					AND AgreementClassification IN(5637144578,5637145326,5637144577,5637145328) -- manufactura (5637144578,5637145326)
					AND AgreementState = 1
				LEFT OUTER JOIN SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.DIRPARTYTABLE DPT ON (CT.PARTY=DPT.RECID 
					AND (ct.PARTITION = DPT.PARTITION)) 	
			GROUP BY CT.Id, DPT.Name, Blocked
		)CAX ON C.Id = CAX.Id COLLATE Modern_Spanish_CI_AS

	UPDATE C
	SET C.Active = 0,
		c.Blocked = ISNULL(CAX.Blocked, 1)
	FROM Customer C 
		LEFT JOIN (
			SELECT CT.Id, DPT.Name [Name], Blocked
			FROM (
					SELECT ACCOUNTNUM AS Id, PARTITION, PARTY, VATNUM AS RFC, CLELIMITECERTIFICACION AS LimiteCertificacion
						, IZT_BUSINESSGROUPID AS IdGpoEmpresarial, 1 AS IdEstatusCliente, GRWBLOCKCARTERA Blocked
					FROM SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.CUSTTABLE
					WHERE DATAAREAID ='ALM' 
				) CT
				INNER JOIN SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.AgreementHeader AH ON CT.Id = AH.VendAccount
					AND AH.DefaultAgreementLineExpirationDate >= CONVERT(DATE, GETDATE())
					AND AgreementClassification IN(5637144578,5637145326,5637144577,5637145328) -- manufactura (5637144578,5637145326)
					AND AgreementState = 1
				LEFT OUTER JOIN SERVPRUEBASAX2.MicrosoftDynamicsAX.dbo.DIRPARTYTABLE DPT ON (CT.PARTY=DPT.RECID 
					AND (ct.PARTITION = DPT.PARTITION)) 	
			GROUP BY CT.Id, DPT.Name, Blocked
		)CAX ON C.Id = CAX.Id COLLATE Modern_Spanish_CI_AS
	WHERE CAX.Id IS NULL

END

GO

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- =============================================
-- Author:		Miguel García
-- Create date: 14 Dic 2020
-- Description:	Registra los productos usados en la unidad
-- =============================================
ALTER PROCEDURE SPIRegisterSiteItemsFromHistory
AS
BEGIN
	SET NOCOUNT ON;

    INSERT SiteItems([SiteId], [ItemId])
	SELECT Base.SiteId, Base.ItemId
	FROM (
		SELECT WT.SiteId, WR.ItemId
		FROM WarehouseRegister WR
			INNER JOIN CheckInCodes CC ON WR.CheckInCodeId = CC.Id
			INNER JOIN CheckIn CH ON CC.CheckInId = CH.Id
			INNER JOIN WeightTicket WT ON CH.WeightTicketId = WT.Id
			INNER JOIN Item I ON WR.ItemId = I.Id
		GROUP BY WT.SiteId, WR.ItemId
		UNION
		SELECT WT.SiteId, QT.ItemId
		FROM QualityTicket QT
			INNER JOIN CheckInCodes CC ON QT.CheckInCodeId = CC.Id
			INNER JOIN CheckIn CH ON CC.CheckInId = CH.Id
			INNER JOIN WeightTicket WT ON CH.WeightTicketId = WT.Id
			INNER JOIN Item I ON QT.ItemId = I.Id
		GROUP BY WT.SiteId, QT.ItemId
	)Base
		LEFT JOIN SiteItems SI ON Base.SiteId = SI.SiteId
			AND Base.ItemId = SI.ItemId
	WHERE SI.ItemId IS NULL
END

GO

-- =============================================
-- Author:		Miguel García
-- Create date: 03 Nov 2020
-- Description:	Synchronize CustomerItem
-- =============================================
ALTER PROCEDURE [dbo].[SynchronizeCustomerItem]
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM CustomerItem
		
	INSERT CustomerItem([CustomerId], [ItemId])
	SELECT VendAccount [CustomerId], IT.ITEMID [ItemId]
	FROM [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.AgreementHeader ah
		INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.EcoResProductCategory epC on ah.TI_GRUPOPRODUCTOS = epC.Category
		INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.ECORESPRODUCT EP ON epC.PRODUCT = EP.RECID
		INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.INVENTTABLE IT ON EP.RECID = IT.PRODUCT
		INNER JOIN [SERVPRUEBASAX2].MicrosoftDynamicsAX.dbo.InventTableModule IM ON IT.ITEMID =IM.ITEMID
			AND IM.MODULETYPE = 0
		INNER JOIN Customer C ON AH.VendAccount = C.Id COLLATE Modern_Spanish_CI_AS
		INNER JOIN Item I ON IT.ITEMID = I.Id COLLATE Modern_Spanish_CI_AS
	WHERE AgreementClassification IN (5637144578,5637145326,5637144577,5637145328)
		AND AH.DefaultAgreementLineExpirationDate >= CONVERT(DATE, GETDATE())
		AND AgreementState = 1
	GROUP BY IT.ITEMID, VendAccount
END



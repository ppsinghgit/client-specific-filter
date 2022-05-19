export class Dropdowndata {
  Value: string;
  Text: string;
  Flag: boolean;
  Type: string;
}

export class DropdowndataFilterModal extends Dropdowndata {}

export class ShowSelectedFiltersCountBySection {
  StoreType: number = 0;
  ContractType: number = 0;
  Region: number = 0;
  Area: number = 0;
  Territory: number = 0;
  Chain: number = 0;
  EnrolledBy: number = 0;
  Broker: number = 0;
  Distributor: number = 0;
  TotalCount: number = 0;
  MwcParentChainName: number = 0;
  MwcDivChainName: number = 0;
  SalesDirector: number = 0;
  DsmBrokerManager: number = 0;
  CdmAccountManager: number = 0;
  District: number = 0;
  SubDistrict: number = 0;
  DistArea: number = 0;
  DistSalesRep: number = 0;
  RetailArea: number = 0;
  RetailSalesRep: number = 0;
  KeyAccount: number = 0;
}
export class SelectedFilterItem {
  Value: string;
  Type: string;
}

export class FilterModel {
  public TotalFilterAppliedCount: number = 0;
  public UserPermissions: string;
  public ProjectOid: number;
  public Status: number; // 0 for cancel, 1 for apply
  public Year: number;
  public TradeProgramName: string;
  public Term: string;
  public Regions: Dropdowndata[];
  public Areas: Dropdowndata[];
  public Territories: Dropdowndata[];
  public StoreTypes: Dropdowndata[];
  public Distributors: Dropdowndata[];
  public Chains: Dropdowndata[];
  public EnrolledBys: Dropdowndata[];

  public MwcParentChainNames: Dropdowndata[];
  public MwcDivChainNames: Dropdowndata[];
  public SalesDirectors: Dropdowndata[];
  public DsmBrokerManagers: Dropdowndata[];
  public CdmAccountManagers: Dropdowndata[];
  public Districts: Dropdowndata[];
  public SubDistricts: Dropdowndata[];
  public DistAreas: Dropdowndata[];
  public DistSalesReps: Dropdowndata[];
  public RetailAreas: Dropdowndata[];
  public RetailSalesReps: Dropdowndata[];
  public KeyAccounts: Dropdowndata[];
}

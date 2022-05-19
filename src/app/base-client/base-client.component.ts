import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard/dashboard.service';
import { FilterDropdownOutput, FilterDropdownInput, ApiDropdownData } from '../dashboard/models/dashboard.model';
import {
  Dropdowndata,
  DropdowndataFilterModal,
  FilterModel,
  SelectedFilterItem,
  ShowSelectedFiltersCountBySection,
} from './filter-modal.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class BaseClientComponent implements OnInit {
  public primaryDdlData: Dropdowndata[];
  public afterSearch: Dropdowndata[];
  public itemSearched: string;
  public selectedSection: string = 'none';
  public showData: boolean = false;
  public primaryDataHeight: number;
  public selectedSectionType: string = '';

  public selectedFilters: SelectedFilterItem[];
  public filtersCount: ShowSelectedFiltersCountBySection =
    new ShowSelectedFiltersCountBySection();
  public closeResult: string;

  @Input() public dataFromDashboard: FilterModel;
  @Input() public filterModelOriginalCopy: FilterModel;
  private filterModel: FilterModel;

  public filterModelInCaseCancel: FilterModel;
  filterDropdownInput: FilterDropdownInput;
  filterDropdownOutput: FilterDropdownOutput;
  public isDisplayChain: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private dashboardService: DashboardService) {
    this.selectedFilters = [];
  }

  ngOnInit() {
    this.filterModel = JSON.parse(JSON.stringify(this.dataFromDashboard)) as FilterModel;
    this.initiate();
  }

  initiate() {
    this.filterModelInCaseCancel = JSON.parse(JSON.stringify(this.filterModel)) as FilterModel;
    this.primaryDdlData = [];
    this.afterSearch = [];
    this.itemSearched = '';
    this.createTagsForSelectedFiltes();
    this.setFiltersCount();
  }

  public OnRegionClick() {
    this.selectedSectionType = sectionType.SalesHierarchy;
    this.selectedSection = sections.Region;
    this.setPrimaryData(this.filterModel.Regions);
  }

  public OnAreaClick() {
    this.selectedSectionType = sectionType.SalesHierarchy;
    this.selectedSection = sections.Area;
    this.setPrimaryData(this.filterModel.Areas);
  }

  public OnTerritoryClick() {
    this.selectedSectionType = sectionType.SalesHierarchy;
    this.selectedSection = sections.Territory;
    this.setPrimaryData(this.filterModel.Territories);
  }

  public OnStoreTypeClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.StoreType;
    this.setPrimaryData(this.filterModel.StoreTypes);
  }

  public OnDistributorClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.Distributor;
    this.setPrimaryData(this.filterModel.Distributors);
  }

  public OnChainClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.Chain;
    this.setPrimaryData(this.filterModel.Chains);
  }

  public OnEnrolledByClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.EnrolledBy;
    this.setPrimaryData(this.filterModel.EnrolledBys);
  }

  public OnSalesDirectorClick() {
    this.selectedSectionType = sectionType.AccountHierarchy;
    this.selectedSection = sections.SalesDirector;
    this.setPrimaryData(this.filterModel.SalesDirectors);
  }

  public OnDsmBrokerManagerClick() {
    this.selectedSectionType = sectionType.AccountHierarchy;
    this.selectedSection = sections.DsmBrokerManager;
    this.setPrimaryData(this.filterModel.DsmBrokerManagers);
  }

  public OnCdmAccountManagerClick() {
    this.selectedSectionType = sectionType.AccountHierarchy;
    this.selectedSection = sections.CdmAccountManager;
    this.setPrimaryData(this.filterModel.CdmAccountManagers);
  }

  public OnMwcParentChainNameClick() {
    this.selectedSectionType = sectionType.AccountHierarchy;
    this.selectedSection = sections.MwcParentChainName;
    this.setPrimaryData(this.filterModel.MwcParentChainNames);
  }

  public OnMwcDivChainNameClick() {
    this.selectedSectionType = sectionType.AccountHierarchy;
    this.selectedSection = sections.MwcDivChainName;
    this.setPrimaryData(this.filterModel.MwcDivChainNames);
  }

  public OnDistrictClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.District;
    this.setPrimaryData(this.filterModel.Districts);
  }

  public OnSubDistrictClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.SubDistrict;
    this.setPrimaryData(this.filterModel.SubDistricts);
  }

  public OnDistAreaClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.DistArea;
    this.setPrimaryData(this.filterModel.DistAreas);
  }

  public OnDistSalesRepClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.DistSalesRep;
    this.setPrimaryData(this.filterModel.DistSalesReps);
  }

  public OnRetailAreaClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.RetailArea;
    this.setPrimaryData(this.filterModel.RetailAreas);
  }

  public OnRetailSalesRepClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.RetailSalesRep;
    this.setPrimaryData(this.filterModel.RetailSalesReps);
  }

  public OnKeyAccountClick() {
    this.selectedSectionType = sectionType.Other;
    this.selectedSection = sections.KeyAccount;
    this.setPrimaryData(this.filterModel.KeyAccounts);
  }

  private setPrimaryData(data: Dropdowndata[]) {
    this.primaryDdlData = data;
    this.afterSearch = this.primaryDdlData;
    this.itemSearched = '';
    this.getPrimaryDataHeight();
  }

  onSearchChange(searchValue: string): void {
    this.itemSearched = searchValue;
    this.afterSearch = this.primaryDdlData.filter((x) =>
      x.Text.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.getPrimaryDataHeight();
  }

  public checkBoxEvent(selected: boolean, value: string) {
    selected = selected ? false : true;
    for (let i = 0; i < this.afterSearch.length; i++) {
      if (this.afterSearch[i].Value == value) {
        this.afterSearch[i].Flag = selected;
        if (this.afterSearch[i].Flag) {
          let item = new SelectedFilterItem();
          item.Value = this.afterSearch[i].Text;
          item.Type = this.selectedSection;

          this.selectedFilters.push(item);
        } else {
          let index = this.selectedFilters.findIndex(
            (x) =>
              x.Value == this.afterSearch[i].Text &&
              x.Type == this.selectedSection
          );
          if (index > -1) {
            this.selectedFilters.splice(index, 1);
          }
        }
      }
    }
    this.getOptionalFilterDropdowns();
    this.setFiltersCount();
  }

  public radioButtonEvent(selected: boolean, value: string) {
    let item: any = null;
    for (let i = 0; i < this.afterSearch.length; i++) {
      if (this.afterSearch[i].Value == value) {
        if (this.afterSearch[i].Flag != selected) {
          this.afterSearch[i].Flag = selected;
          item = new SelectedFilterItem();
          item.Value = this.afterSearch[i].Text;
          item.Type = this.selectedSection;
          this.selectedFilters.push(item);
        }
      } else {
        this.afterSearch[i].Flag = false;
        let index = this.selectedFilters.findIndex(
          (x) =>
            x.Value == this.afterSearch[i].Text &&
            x.Type == this.selectedSection
        );
        if (index > -1) {
          this.selectedFilters.splice(index, 1);
        }
      }
    }
    this.getOptionalFilterDropdowns();
    this.setFiltersCount();
  }

  public showDataClick() {
    if (this.showData) {
      this.showData = false;
    } else {
      this.showData = true;
    }
  }

  public clearAll() {
    this.primaryDdlData = [];
    this.afterSearch = [];
    this.itemSearched = '';
    this.selectedSection = 'none';
    this.selectedFilters = [];
    this.filtersCount = new ShowSelectedFiltersCountBySection();
    this.filterModel = JSON.parse(JSON.stringify(this.filterModelOriginalCopy)) as FilterModel;
    this.isDisplayChainOrNot();
  }

  private getPrimaryDataHeight(): any {
    let scrollBar = '';
    let height = '';

    if (this.afterSearch) {
      if (this.afterSearch.length > 10) {
        this.primaryDataHeight = 300;
      } else {
        this.primaryDataHeight = this.afterSearch.length * 35;
      }
    }

    if (this.primaryDataHeight < 300) {
      scrollBar = 'hidden';
      height = 'auto';
    } else {
      scrollBar = 'scroll';
      height = this.primaryDataHeight + 'px';
    }
    return {
      height: height,
      'overflow-y': scrollBar,
    };
  }

  private setFiltersCount() {
    this.filtersCount.Region = this.filterModel?.Regions.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.Area = this.filterModel?.Areas.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.Territory = this.filterModel?.Territories.filter(
      (x) => x.Flag == true
    ).length;

    this.filtersCount.StoreType = this.filterModel?.StoreTypes.filter(
      (x) => x.Flag == true
    ).length;

    this.filtersCount.Chain = this.filterModel?.Chains.filter(
      (x) => x.Flag == true
    ).length;

    this.filtersCount.Distributor = this.filterModel?.Distributors.filter(
      (x) => x.Flag == true
    ).length;

    this.filtersCount.EnrolledBy = this.filterModel?.EnrolledBys.filter(
      (x) => x.Flag == true
    ).length;

    /* CLIENT SPECIFIC FILTERS */
    this.filtersCount.MwcParentChainName = this.filterModel?.MwcParentChainNames.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.MwcDivChainName = this.filterModel?.MwcDivChainNames.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.SalesDirector = this.filterModel?.SalesDirectors.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.DsmBrokerManager = this.filterModel?.DsmBrokerManagers.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.CdmAccountManager = this.filterModel?.CdmAccountManagers.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.District = this.filterModel?.Districts.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.SubDistrict = this.filterModel?.SubDistricts.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.DistArea = this.filterModel?.DistAreas.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.DistSalesRep = this.filterModel?.DistSalesReps.filter(
      (x) => x.Flag == true
    ).length;

    this.filtersCount.RetailArea = this.filterModel?.RetailAreas.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.RetailSalesRep = this.filterModel?.RetailSalesReps.filter(
      (x) => x.Flag == true
    ).length;
    this.filtersCount.KeyAccount = this.filterModel?.KeyAccounts.filter(
      (x) => x.Flag == true
    ).length;

    this.filtersCount.TotalCount =
      this.filtersCount.Region +
      this.filtersCount.Area +
      this.filtersCount.Territory +
      this.filtersCount.StoreType +
      this.filtersCount.Chain +
      this.filtersCount.Distributor +
      this.filtersCount.EnrolledBy +
      this.filtersCount.MwcParentChainName +
      this.filtersCount.MwcDivChainName +
      this.filtersCount.SalesDirector +
      this.filtersCount.DsmBrokerManager +
      this.filtersCount.CdmAccountManager +
      this.filtersCount.District +
      this.filtersCount.SubDistrict +
      this.filtersCount.DistArea +
      this.filtersCount.DistSalesRep +
      this.filtersCount.RetailArea +
      this.filtersCount.RetailSalesRep +
      this.filtersCount.KeyAccount;

    this.isDisplayChainOrNot();

    this.createTagsForSelectedFiltes('');

  }

  public removeSingleFilter(type: string, value: string) {
    let item: Dropdowndata;
    if (type == sections.Region) {
      for (let i = 0; i < this.filterModel.Regions.length; i++) {
        if (this.filterModel.Regions[i].Text == value) {
          this.filterModel.Regions[i].Flag = false;
        }
      }
    }
    else if (type == sections.Area) {
      for (let i = 0; i < this.filterModel.Areas.length; i++) {
        if (this.filterModel.Areas[i].Text == value) {
          this.filterModel.Areas[i].Flag = false;
        }
      }
    }
    else if (type == sections.Territory) {
      for (let i = 0; i < this.filterModel.Territories.length; i++) {
        if (this.filterModel.Territories[i].Text == value) {
          this.filterModel.Territories[i].Flag = false;
        }
      }
    }

    else if (type == sections.StoreType) {
      for (let i = 0; i < this.filterModel.StoreTypes.length; i++) {
        if (this.filterModel.StoreTypes[i].Text == value) {
          this.filterModel.StoreTypes[i].Flag = false;
        }
      }
    }

    else if (type == sections.Distributor) {
      for (let i = 0; i < this.filterModel.Distributors.length; i++) {
        if (this.filterModel.Distributors[i].Text == value) {
          this.filterModel.Distributors[i].Flag = false;
        }
      }
    }

    else if (type == sections.EnrolledBy) {
      for (let i = 0; i < this.filterModel.EnrolledBys.length; i++) {
        if (this.filterModel.EnrolledBys[i].Text == value) {
          this.filterModel.EnrolledBys[i].Flag = false;
        }
      }
    }

    else if (type == sections.Chain) {
      for (let i = 0; i < this.filterModel.Chains.length; i++) {
        if (this.filterModel.Chains[i].Text == value) {
          this.filterModel.Chains[i].Flag = false;
        }
      }
    }

    /* CLIENT SPECIFIC FILTERS*/

    //MwcParentChainNames
    if (type == sections.MwcParentChainName) {
      for (let i = 0; i < this.filterModel.MwcParentChainNames.length; i++) {
        if (this.filterModel.MwcParentChainNames[i].Text == value) {
          this.filterModel.MwcParentChainNames[i].Flag = false;
        }
      }
    }

    //SalesDirectors
    if (type == sections.SalesDirector) {
      for (let i = 0; i < this.filterModel.SalesDirectors.length; i++) {
        if (this.filterModel.SalesDirectors[i].Text == value) {
          this.filterModel.SalesDirectors[i].Flag = false;
        }
      }
    }

    //DsmBrokerManagers
    if (type == sections.DsmBrokerManager) {
      for (let i = 0; i < this.filterModel.DsmBrokerManagers.length; i++) {
        if (this.filterModel.DsmBrokerManagers[i].Text == value) {
          this.filterModel.DsmBrokerManagers[i].Flag = false;
        }
      }
    }

    //CdmAccountManagers
    if (type == sections.CdmAccountManager) {
      for (let i = 0; i < this.filterModel.CdmAccountManagers.length; i++) {
        if (this.filterModel.CdmAccountManagers[i].Text == value) {
          this.filterModel.CdmAccountManagers[i].Flag = false;
        }
      }
    }

    //Districts
    if (type == sections.District) {
      for (let i = 0; i < this.filterModel.Districts.length; i++) {
        if (this.filterModel.Districts[i].Text == value) {
          this.filterModel.Districts[i].Flag = false;
        }
      }
    }

    //SubDistricts
    if (type == sections.SubDistrict) {
      for (let i = 0; i < this.filterModel.SubDistricts.length; i++) {
        if (this.filterModel.SubDistricts[i].Text == value) {
          this.filterModel.SubDistricts[i].Flag = false;
        }
      }
    }

    //DistAreas
    if (type == sections.DistArea) {
      for (let i = 0; i < this.filterModel.DistAreas.length; i++) {
        if (this.filterModel.DistAreas[i].Text == value) {
          this.filterModel.DistAreas[i].Flag = false;
        }
      }
    }

    //Dist Sales Rep
    if (type == sections.DistSalesRep) {
      for (let i = 0; i < this.filterModel.DistSalesReps.length; i++) {
        if (this.filterModel.DistSalesReps[i].Text == value) {
          this.filterModel.DistSalesReps[i].Flag = false;
        }
      }
    }

    //RetailAreas
    if (type == sections.RetailArea) {
      for (let i = 0; i < this.filterModel.RetailAreas.length; i++) {
        if (this.filterModel.RetailAreas[i].Text == value) {
          this.filterModel.RetailAreas[i].Flag = false;
        }
      }
    }

    //Dist Sales Rep
    if (type == sections.RetailSalesRep) {
      for (let i = 0; i < this.filterModel.RetailSalesReps.length; i++) {
        if (this.filterModel.RetailSalesReps[i].Text == value) {
          this.filterModel.RetailSalesReps[i].Flag = false;
        }
      }
    }

    //Key Account
    if (type == sections.KeyAccount) {
      for (let i = 0; i < this.filterModel.KeyAccounts.length; i++) {
        if (this.filterModel.KeyAccounts[i].Text == value) {
          this.filterModel.KeyAccounts[i].Flag = false;
        }
      }
    }



    let index = this.selectedFilters.findIndex(
      (x) => x.Type == type && x.Value == value
    );
    if (index > -1) {
      this.selectedFilters.splice(index, 1);
    }
    this.setFiltersCount();
    this.getOptionalFilterDropdowns();
  }

  public ApplyFilter() {
    this.filterModel.Status = 1;
    this.filterModel.TotalFilterAppliedCount = this.filtersCount.TotalCount;
    this.activeModal.close(this.filterModel);
  }

  public cancel() {
    this.activeModal.close(this.filterModelInCaseCancel);
  }

  private getOptionalFilterDropdowns() {
    sessionStorage.setItem('isSpinnerRequired', 'yes');

    this.filterDropdownInput = new FilterDropdownInput();
    this.filterDropdownInput.UserPermissions = this.filterModel.UserPermissions;
    this.filterDropdownInput.ProjectOid = this.filterModel.ProjectOid;
    this.filterDropdownInput.ComplianceYear = this.filterModel.Year;
    this.filterDropdownInput.TradeProgramName = this.filterModel.TradeProgramName;
    this.filterDropdownInput.Term = this.filterModel.Term;

    this.filterDropdownInput.Region = this.setValueToNullIfBlank(this.filterModel.Regions.filter(x => x.Flag == true).map(x => x.Value).toString());
    this.filterDropdownInput.Area = this.setValueToNullIfBlank(this.filterModel.Areas.filter(x => x.Flag == true).map(x => x.Value).toString());
    this.filterDropdownInput.Territory = this.setValueToNullIfBlank(this.filterModel.Territories.filter(x => x.Flag == true).map(x => x.Value).toString());
    this.filterDropdownInput.StoreType = this.setValueToNullIfBlank(this.filterModel.StoreTypes.filter(x => x.Flag == true).map(x => x.Value).toString());


    // Chain
    if (this.filterModel.Chains.length == this.filterModel.Chains.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.Chain = null;
    }
    else {
      this.filterDropdownInput.Chain = this.setValueToNullIfBlank(this.filterModel.Chains.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // Distributor
    if (this.filterModel.Distributors.length == this.filterModel.Distributors.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.Distributor = null;
    }
    else {
      this.filterDropdownInput.Distributor = this.setValueToNullIfBlank(this.filterModel.Distributors.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // Enrolled By
    if (this.filterModel.EnrolledBys.length == this.filterModel.EnrolledBys.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.EnrolledBy = null;
    }
    else {
      this.filterDropdownInput.EnrolledBy = this.setValueToNullIfBlank(this.filterModel.EnrolledBys.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // MwcParentChainName
    if (this.filterModel.MwcParentChainNames.length == this.filterModel.MwcParentChainNames.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.MwcParentChainName = null;
    }
    else {
      this.filterDropdownInput.MwcParentChainName = this.setValueToNullIfBlank(this.filterModel.MwcParentChainNames.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // MwcDivChainName
    if (this.filterModel.MwcDivChainNames.length == this.filterModel.MwcDivChainNames.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.MwcDivChainName = null;
    }
    else {
      this.filterDropdownInput.MwcDivChainName = this.setValueToNullIfBlank(this.filterModel.MwcDivChainNames.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // CdmAccountManager
    if (this.filterModel.CdmAccountManagers.length == this.filterModel.CdmAccountManagers.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.CdmAccountManager = null;
    }
    else {
      this.filterDropdownInput.CdmAccountManager = this.setValueToNullIfBlank(this.filterModel.CdmAccountManagers.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // SalesDirector
    if (this.filterModel.SalesDirectors.length == this.filterModel.SalesDirectors.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.SalesDirector = null;
    }
    else {
      this.filterDropdownInput.SalesDirector = this.setValueToNullIfBlank(this.filterModel.SalesDirectors.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // DsmBrokerManager
    if (this.filterModel.DsmBrokerManagers.length == this.filterModel.DsmBrokerManagers.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.DsmBrokerManager = null;
    }
    else {
      this.filterDropdownInput.DsmBrokerManager = this.setValueToNullIfBlank(this.filterModel.DsmBrokerManagers.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // District
    if (this.filterModel.Districts.length == this.filterModel.Districts.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.District = null;
    }
    else {
      this.filterDropdownInput.District = this.setValueToNullIfBlank(this.filterModel.Districts.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // District
    if (this.filterModel.SubDistricts.length == this.filterModel.SubDistricts.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.SubDistrict = null;
    }
    else {
      this.filterDropdownInput.SubDistrict = this.setValueToNullIfBlank(this.filterModel.SubDistricts.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // DistArea
    if (this.filterModel.DistAreas.length == this.filterModel.DistAreas.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.DistArea = null;
    }
    else {
      this.filterDropdownInput.DistArea = this.setValueToNullIfBlank(this.filterModel.DistAreas.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // DistSalesRep
    if (this.filterModel.DistSalesReps.length == this.filterModel.DistSalesReps.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.DistSalesRep = null;
    }
    else {
      this.filterDropdownInput.DistSalesRep = this.setValueToNullIfBlank(this.filterModel.DistSalesReps.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // RetailArea
    if (this.filterModel.RetailAreas.length == this.filterModel.RetailAreas.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.RetailArea = null;
    }
    else {
      this.filterDropdownInput.RetailArea = this.setValueToNullIfBlank(this.filterModel.RetailAreas.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // Retail Sales Rep
    if (this.filterModel.RetailSalesReps.length == this.filterModel.RetailSalesReps.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.RetailSalesRep = null;
    }
    else {
      this.filterDropdownInput.RetailSalesRep = this.setValueToNullIfBlank(this.filterModel.RetailSalesReps.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    // KeyAccount
    if (this.filterModel.KeyAccounts.length == this.filterModel.KeyAccounts.filter(x => x.Flag == true).length) {
      this.filterDropdownInput.KeyAccount = null;
    }
    else {
      this.filterDropdownInput.KeyAccount = this.setValueToNullIfBlank(this.filterModel.KeyAccounts.filter(x => x.Flag == true).map(x => x.Value).toString());
    }

    this.dashboardService.FilterDropdowns(this.filterDropdownInput).subscribe(data => {

      if (data != null && data != undefined) {
        let convertedApiData = [];
        this.filterDropdownOutput = new FilterDropdownOutput();
        this.filterDropdownOutput = data as FilterDropdownOutput;

        //region
        if (this.filterDropdownOutput.RegionData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.RegionData as ApiDropdownData[],
            sectionType.SalesHierarchy
          );
          this.filterModel.Regions = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.Region), convertedApiData);
        }
        else {
          this.filterModel.Regions = [];
        }
        // area
        if (this.filterDropdownOutput.AreaData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.AreaData as ApiDropdownData[],
            sectionType.SalesHierarchy
          );
          this.filterModel.Areas = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.Area), convertedApiData);
        }
        else {
          this.filterModel.Areas = [];
        }

        //territory

        if (this.filterDropdownOutput.TerritoryData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.TerritoryData as ApiDropdownData[],
            sectionType.SalesHierarchy
          );
          this.filterModel.Territories = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.Territory), convertedApiData);
        }
        else {
          this.filterModel.Territories = [];
        }


        // storeType
        if (this.filterDropdownOutput.StoreTypeData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.StoreTypeData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.StoreTypes = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.StoreType), convertedApiData);

        }
        else {
          this.filterModel.StoreTypes = [];
        }

        // distributors
        if (this.filterDropdownOutput.DistributorData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.DistributorData as ApiDropdownData[],
            sectionType.Other
          );

          this.filterModel.Distributors = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.Distributor), convertedApiData);
        }
        else {
          this.filterModel.Distributors = [];
        }

        // chain
        if (this.filterDropdownOutput.ChainData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.ChainData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.Chains = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.Chain), convertedApiData);
        }
        else {
          this.filterModel.Chains = [];
        }

        // enrolledBy
        if (this.filterDropdownOutput.EnrolledByData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.EnrolledByData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.EnrolledBys = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.EnrolledBy), convertedApiData);
        }
        else {
          this.filterModel.EnrolledBys = [];
        }

        // Mwc Parent Chain Names
        if (this.filterDropdownOutput.MwcParentChainNameData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.MwcParentChainNameData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.MwcParentChainNames = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.MwcParentChainName), convertedApiData);
        }
        else {
          this.filterModel.MwcParentChainNames = [];
        }

        // Mwc  DivChain Names
        if (this.filterDropdownOutput.MwcDivChainNameData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.MwcDivChainNameData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.MwcDivChainNames = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.MwcDivChainName), convertedApiData);
        }
        else {
          this.filterModel.MwcDivChainNames = [];
        }
        // Sales Directors
        if (this.filterDropdownOutput.SalesDirectorData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.SalesDirectorData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.SalesDirectors = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.SalesDirector), convertedApiData);
        }
        else {
          this.filterModel.SalesDirectors = [];
        }

        // Dsm  Broker Managers
        if (this.filterDropdownOutput.DsmBrokerManagerData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.DsmBrokerManagerData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.DsmBrokerManagers = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.DsmBrokerManager), convertedApiData);
        }
        else {
          this.filterModel.DsmBrokerManagers = [];
        }


        // public CdmAccountManagers: Dropdowndata[];
        if (this.filterDropdownOutput.CdmAccountManagerData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.CdmAccountManagerData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.CdmAccountManagers = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.CdmAccountManager), convertedApiData);
        }
        else {
          this.filterModel.CdmAccountManagers = [];
        }

        // Districts
        if (this.filterDropdownOutput.DistrictData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.DistrictData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.Districts = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.District), convertedApiData);
        }
        else {
          this.filterModel.Districts = [];
        }

        // Sub Districts
        if (this.filterDropdownOutput.SubDistrictData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.SubDistrictData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.SubDistricts = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.SubDistrict
          ), convertedApiData);
        }
        else {
          this.filterModel.Districts = [];
        }

        //Dist Areas
        if (this.filterDropdownOutput.DistAreaData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.DistAreaData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.DistAreas = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.DistArea), convertedApiData);
        }
        else {
          this.filterModel.DistAreas = [];
        }

        // Dist Sales Reps
        if (this.filterDropdownOutput.DistSalesRepData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.DistSalesRepData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.DistSalesReps = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.DistSalesRep), convertedApiData);
        }
        else {
          this.filterModel.DistSalesReps = [];
        }


        //Retail Areas
        if (this.filterDropdownOutput.RetailAreaData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.RetailAreaData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.RetailAreas = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.RetailArea), convertedApiData);
        }
        else {
          this.filterModel.RetailAreas = [];
        }

        // Retail Sales Reps
        if (this.filterDropdownOutput.RetailSalesRepData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.RetailSalesRepData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.RetailSalesReps = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.RetailSalesRep), convertedApiData);
        }
        else {
          this.filterModel.RetailSalesReps = [];
        }

        // Account Key
        if (this.filterDropdownOutput.KeyAccountData) {
          convertedApiData = null;
          convertedApiData = this.convertDropdownDataToFilterModal(
            this.filterDropdownOutput.KeyAccountData as ApiDropdownData[],
            sectionType.Other
          );
          this.filterModel.KeyAccounts = this.retainSelection(this.selectedFilters.filter(x => x.Type == sections.KeyAccount), convertedApiData);
        }
        else {
          this.filterModel.KeyAccounts = [];
        }

        sessionStorage.setItem('isSpinnerRequired', 'no');

        this.setPrimaryDataAfterUpdation();
        convertedApiData = null;

      }
    });
  }

  private convertDropdownDataToFilterModal(
    data: ApiDropdownData[],
    type: string
  ): Dropdowndata[] {
    let outputArray: Dropdowndata[] = [];
    let item: Dropdowndata;
    if (data != null && data != undefined) {
      for (let i = 0; i < data.length; i++) {
        item = null;
        item = new Dropdowndata();
        item.Text = data[i].Text;
        item.Value = data[i].Value;
        item.Flag = false;
        item.Type = type;
        outputArray.push(item);
      }
    }
    return outputArray;
  }

  private setValueToNullIfBlank(value: string): string {
    if (value == '') {
      return null;
    }
    else {
      return value;
    }
  }

  private createTagsForSelectedFiltes(type: string = '') {
    if (type == '') {
      this.selectedFilters = [];
    }
    let item: SelectedFilterItem;

    //storeType
    if (type == sections.StoreType || type == '') {
      if (this.filterModel.StoreTypes) {
        for (let i = 0; i < this.filterModel.StoreTypes.length; i++) {
          if (this.filterModel.StoreTypes[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.StoreTypes[i].Value;
            item.Type = sections.StoreType;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //region
    if (type == sections.Region || type == '') {
      if (this.filterModel.Regions) {
        for (let i = 0; i < this.filterModel.Regions.length; i++) {
          if (this.filterModel.Regions[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.Regions[i].Value;
            item.Type = sections.Region;
            this.selectedFilters.push(item);
          }
        }
      }
    }
    //area
    if (type == sections.Area || type == '') {
      if (this.filterModel.Areas) {
        for (let i = 0; i < this.filterModel.Areas.length; i++) {
          if (this.filterModel.Areas[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.Areas[i].Value;
            item.Type = sections.Area;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //territory
    if (type == sections.Territory || type == '') {
      if (this.filterModel.Territories) {
        for (let i = 0; i < this.filterModel.Territories.length; i++) {
          if (this.filterModel.Territories[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.Territories[i].Value;
            item.Type = sections.Territory;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //Chain
    if (type == sections.Chain || type == '') {
      if (this.filterModel.Chains) {
        for (let i = 0; i < this.filterModel.Chains.length; i++) {
          if (this.filterModel.Chains[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.Chains[i].Value;
            item.Type = sections.Chain;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //enrolledBy
    if (type == sections.EnrolledBy || type == '') {
      if (this.filterModel.EnrolledBys) {
        for (let i = 0; i < this.filterModel.EnrolledBys.length; i++) {
          if (this.filterModel.EnrolledBys[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.EnrolledBys[i].Text;
            item.Type = sections.EnrolledBy;
            this.selectedFilters.push(item);
          }
        }
      }
    }
    //distributors
    if (type == sections.Distributor || type == '') {
      if (this.filterModel.Distributors) {
        for (let i = 0; i < this.filterModel.Distributors.length; i++) {
          if (this.filterModel.Distributors[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.Distributors[i].Value;
            item.Type = sections.Distributor;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    /* CLIENT SPECIFIC FILTERS */

    //mwc parent chain name
    if (type == sections.MwcParentChainName || type == '') {
      if (this.filterModel.MwcParentChainNames) {
        for (let i = 0; i < this.filterModel.MwcParentChainNames.length; i++) {
          if (this.filterModel.MwcParentChainNames[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.MwcParentChainNames[i].Value;
            item.Type = sections.MwcParentChainName;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //mwc div  chain name
    if (type == sections.MwcDivChainName || type == '') {
      if (this.filterModel.MwcDivChainNames) {
        for (let i = 0; i < this.filterModel.MwcDivChainNames.length; i++) {
          if (this.filterModel.MwcDivChainNames[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.MwcDivChainNames[i].Value;
            item.Type = sections.MwcDivChainName;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //Sales Directors
    if (type == sections.SalesDirector || type == '') {
      if (this.filterModel.SalesDirectors) {
        for (let i = 0; i < this.filterModel.SalesDirectors.length; i++) {
          if (this.filterModel.SalesDirectors[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.SalesDirectors[i].Value;
            item.Type = sections.SalesDirector;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //Dsm Broker Managers
    if (type == sections.DsmBrokerManager || type == '') {
      if (this.filterModel.DsmBrokerManagers) {
        for (let i = 0; i < this.filterModel.DsmBrokerManagers.length; i++) {
          if (this.filterModel.DsmBrokerManagers[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.DsmBrokerManagers[i].Value;
            item.Type = sections.DsmBrokerManager;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    //Cdm Account Managers
    if (type == sections.CdmAccountManager || type == '') {
      if (this.filterModel.CdmAccountManagers) {
        for (let i = 0; i < this.filterModel.CdmAccountManagers.length; i++) {
          if (this.filterModel.CdmAccountManagers[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.CdmAccountManagers[i].Value;
            item.Type = sections.CdmAccountManager;
            this.selectedFilters.push(item);
          }
        }
      }
    }
    //District
    if (type == sections.District || type == '') {
      if (this.filterModel.Districts) {
        for (let i = 0; i < this.filterModel.Districts.length; i++) {
          if (this.filterModel.Districts[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.Districts[i].Value;
            item.Type = sections.District;
            this.selectedFilters.push(item);
          }
        }
      }
    }
    // Sub District
    if (type == sections.SubDistrict || type == '') {
      if (this.filterModel.SubDistricts) {
        for (let i = 0; i < this.filterModel.SubDistricts.length; i++) {
          if (this.filterModel.SubDistricts[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.SubDistricts[i].Value;
            item.Type = sections.SubDistrict;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    // Dist Area
    if (type == sections.DistArea || type == '') {
      if (this.filterModel.DistAreas) {
        for (let i = 0; i < this.filterModel.DistAreas.length; i++) {
          if (this.filterModel.DistAreas[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.DistAreas[i].Value;
            item.Type = sections.DistArea;
            this.selectedFilters.push(item);
          }
        }
      }
    }
    // Dist Sales Rep 
    if (type == sections.DistSalesRep || type == '') {
      if (this.filterModel.DistSalesReps) {
        for (let i = 0; i < this.filterModel.DistSalesReps.length; i++) {
          if (this.filterModel.DistSalesReps[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.DistSalesReps[i].Value;
            item.Type = sections.DistSalesRep;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    // Retail Area
    if (type == sections.RetailArea || type == '') {
      if (this.filterModel.RetailAreas) {
        for (let i = 0; i < this.filterModel.RetailAreas.length; i++) {
          if (this.filterModel.RetailAreas[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.RetailAreas[i].Value;
            item.Type = sections.RetailArea;
            this.selectedFilters.push(item);
          }
        }
      }
    }
    // Retail Sales Rep 
    if (type == sections.RetailSalesRep || type == '') {
      if (this.filterModel.RetailSalesReps) {
        for (let i = 0; i < this.filterModel.RetailSalesReps.length; i++) {
          if (this.filterModel.RetailSalesReps[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.RetailSalesReps[i].Value;
            item.Type = sections.RetailSalesRep;
            this.selectedFilters.push(item);
          }
        }
      }
    }

    // Key Account
    if (type == sections.KeyAccount || type == '') {
      if (this.filterModel.KeyAccounts) {
        for (let i = 0; i < this.filterModel.KeyAccounts.length; i++) {
          if (this.filterModel.KeyAccounts[i].Flag == true) {
            item = null;
            item = new SelectedFilterItem();
            item.Value = this.filterModel.KeyAccounts[i].Value;
            item.Type = sections.KeyAccount;
            this.selectedFilters.push(item);
          }
        }
      }
    }

  }

  private isDisplayChainOrNot() {
    if (this.selectedFilters) {
      let _isexist = this.selectedFilters.filter(x => x.Type == sections.StoreType && x.Value == 'Chain');
      this.isDisplayChain = _isexist.length > 0 ? true : false;
      if (!this.isDisplayChain) {
        if (this.filterModel.Chains) {
          for (let i = 0; i < this.filterModel.Chains.length; i++) {
            if (this.filterModel.Chains[i].Flag == true) {
              this.filterModel.Chains[i].Flag = false;
            }
          }
        }
      }
    }
  }

  public onChangeChecboxSection(type: string, isChecked: boolean) {
    if (isChecked) {
      //storeType
      if (type == sections.StoreType) {
        for (let i = 0; i < this.filterModel.StoreTypes.length; i++) {
          if (this.filterModel.StoreTypes[i].Flag == false) {
            this.filterModel.StoreTypes[i].Flag = true;
          }
        }
      }
      if (type == sections.Chain) {
        //Chain
        for (let i = 0; i < this.filterModel.Chains.length; i++) {
          if (this.filterModel.Chains[i].Flag == false) {
            this.filterModel.Chains[i].Flag = true;
          }
        }
      }
      //enrolledBy
      if (type == sections.EnrolledBy) {
        for (let i = 0; i < this.filterModel.EnrolledBys.length; i++) {
          if (this.filterModel.EnrolledBys[i].Flag == false) {
            this.filterModel.EnrolledBys[i].Flag = true;
          }
        }
      }

      //distributors
      if (type == sections.Distributor) {
        for (let i = 0; i < this.filterModel.Distributors.length; i++) {
          if (this.filterModel.Distributors[i].Flag == false) {
            this.filterModel.Distributors[i].Flag = true;
          }
        }
      }

      /* CLIENT SPECIFIC FILTERS */

      //MwcParentChainNames
      if (type == sections.MwcParentChainName) {
        for (let i = 0; i < this.filterModel.MwcParentChainNames.length; i++) {
          if (this.filterModel.MwcParentChainNames[i].Flag == false) {
            this.filterModel.MwcParentChainNames[i].Flag = true;
          }
        }
      }
      //MwcDivChainNames
      if (type == sections.MwcDivChainName) {
        for (let i = 0; i < this.filterModel.MwcDivChainNames.length; i++) {
          if (this.filterModel.MwcDivChainNames[i].Flag == false) {
            this.filterModel.MwcDivChainNames[i].Flag = true;
          }
        }
      }

      //SalesDirectors
      if (type == sections.SalesDirector) {
        for (let i = 0; i < this.filterModel.SalesDirectors.length; i++) {
          if (this.filterModel.SalesDirectors[i].Flag == false) {
            this.filterModel.SalesDirectors[i].Flag = true;
          }
        }
      }

      //DsmBrokerManagers
      if (type == sections.DsmBrokerManager) {
        for (let i = 0; i < this.filterModel.DsmBrokerManagers.length; i++) {
          if (this.filterModel.DsmBrokerManagers[i].Flag == false) {
            this.filterModel.DsmBrokerManagers[i].Flag = true;
          }
        }
      }

      //CdmAccountManagers
      if (type == sections.CdmAccountManager) {
        for (let i = 0; i < this.filterModel.CdmAccountManagers.length; i++) {
          if (this.filterModel.CdmAccountManagers[i].Flag == false) {
            this.filterModel.CdmAccountManagers[i].Flag = true;
          }
        }
      }

      //Districts
      if (type == sections.District) {
        for (let i = 0; i < this.filterModel.Districts.length; i++) {
          if (this.filterModel.Districts[i].Flag == false) {
            this.filterModel.Districts[i].Flag = false;
          }
        }
      }

      //SubDistricts
      if (type == sections.SubDistrict) {
        for (let i = 0; i < this.filterModel.SubDistricts.length; i++) {
          if (this.filterModel.SubDistricts[i].Flag == false) {
            this.filterModel.SubDistricts[i].Flag = true;
          }
        }
      }

      //DistAreas
      if (type == sections.DistArea) {
        for (let i = 0; i < this.filterModel.DistAreas.length; i++) {
          if (this.filterModel.DistAreas[i].Flag == false) {
            this.filterModel.DistAreas[i].Flag = true;
          }
        }
      }

      //DistAreas
      if (type == sections.DistSalesRep) {
        for (let i = 0; i < this.filterModel.DistSalesReps.length; i++) {
          if (this.filterModel.DistSalesReps[i].Flag == false) {
            this.filterModel.DistSalesReps[i].Flag = true;
          }
        }
      }

    } else {

      //storeType
      if (type == sections.StoreType) {
        for (let i = 0; i < this.filterModel.StoreTypes.length; i++) {
          if (this.filterModel.StoreTypes[i].Flag == true) {
            this.filterModel.StoreTypes[i].Flag = false;
          }
        }
      }
      //Chain
      if (type == sections.Chain) {
        for (let i = 0; i < this.filterModel.Chains.length; i++) {
          if (this.filterModel.Chains[i].Flag == true) {
            this.filterModel.Chains[i].Flag = false;
          }
        }
      }

      //enrolledBy
      if (type == sections.EnrolledBy) {
        for (let i = 0; i < this.filterModel.EnrolledBys.length; i++) {
          if (this.filterModel.EnrolledBys[i].Flag == true) {
            this.filterModel.EnrolledBys[i].Flag = false;
          }
        }
      }

      //distributors
      if (type == sections.Distributor) {
        for (let i = 0; i < this.filterModel.Distributors.length; i++) {
          if (this.filterModel.Distributors[i].Flag == true) {
            this.filterModel.Distributors[i].Flag = false;
          }
        }
      }


      //MwcParentChainNames
      if (type == sections.MwcParentChainName) {
        for (let i = 0; i < this.filterModel.MwcParentChainNames.length; i++) {
          if (this.filterModel.MwcParentChainNames[i].Flag == true) {
            this.filterModel.MwcParentChainNames[i].Flag = false;
          }
        }
      }
      //MwcDivChainNames
      if (type == sections.MwcDivChainName) {
        for (let i = 0; i < this.filterModel.MwcDivChainNames.length; i++) {
          if (this.filterModel.MwcDivChainNames[i].Flag == true) {
            this.filterModel.MwcDivChainNames[i].Flag = false;
          }
        }
      }
      //SalesDirectors
      if (type == sections.SalesDirector) {
        for (let i = 0; i < this.filterModel.SalesDirectors.length; i++) {
          if (this.filterModel.SalesDirectors[i].Flag == true) {
            this.filterModel.SalesDirectors[i].Flag = false;
          }
        }
      }

      //DsmBrokerManagers
      if (type == sections.DsmBrokerManager) {
        for (let i = 0; i < this.filterModel.DsmBrokerManagers.length; i++) {
          if (this.filterModel.DsmBrokerManagers[i].Flag == true) {
            this.filterModel.DsmBrokerManagers[i].Flag = false;
          }
        }
      }

      //CdmAccountManagers
      if (type == sections.CdmAccountManager) {
        for (let i = 0; i < this.filterModel.CdmAccountManagers.length; i++) {
          if (this.filterModel.CdmAccountManagers[i].Flag == true) {
            this.filterModel.CdmAccountManagers[i].Flag = false;
          }
        }
      }

      //Districts
      if (type == sections.District) {
        for (let i = 0; i < this.filterModel.Districts.length; i++) {
          if (this.filterModel.Districts[i].Flag == true) {
            this.filterModel.Districts[i].Flag = false;
          }
        }
      }

      //SubDistricts
      if (type == sections.SubDistrict) {
        for (let i = 0; i < this.filterModel.SubDistricts.length; i++) {
          if (this.filterModel.SubDistricts[i].Flag == true) {
            this.filterModel.SubDistricts[i].Flag = false;
          }
        }
      }

      //DistAreas
      if (type == sections.DistArea) {
        for (let i = 0; i < this.filterModel.DistAreas.length; i++) {
          if (this.filterModel.DistAreas[i].Flag == true) {
            this.filterModel.DistAreas[i].Flag = false;
          }
        }
      }

      //DistAreas
      if (type == sections.DistSalesRep) {
        for (let i = 0; i < this.filterModel.DistSalesReps.length; i++) {
          if (this.filterModel.DistSalesReps[i].Flag == true) {
            this.filterModel.DistSalesReps[i].Flag = false;
          }
        }
      }

      let _arraySelectedItem = this.selectedFilters.filter(x => x.Type != type);
      if (_arraySelectedItem) {
        this.selectedFilters = _arraySelectedItem;
      }
      else {
        this.selectedFilters = [];
      }
    }
    this.createTagsForSelectedFiltes(type);
    this.setFiltersCount();
    this.getOptionalFilterDropdowns();
  }

  private checkIfDataExists(item: any): boolean {
    if (item == null || item == undefined || item == NaN || item == '') {
      return false;
    }
    else {
      if (Array.isArray(item)) {
        if (item.length == 0) {
          return false;
        }
      }
    }
    return true;
  }

  private setPrimaryDataAfterUpdation() {
    //region
    if (this.selectedSection == sections.Region) {
      this.setPrimaryData(this.filterModel.Regions)
    }
    //area
    else if (this.selectedSection == sections.Area) {
      this.setPrimaryData(this.filterModel.Areas)
    }
    //territory
    else if (this.selectedSection == sections.Territory) {
      this.setPrimaryData(this.filterModel.Territories)
    }
    // dist
    else if (this.selectedSection == sections.Distributor) {
      this.setPrimaryData(this.filterModel.Distributors)
    }
    // chain
    else if (this.selectedSection == sections.Chain) {
      this.setPrimaryData(this.filterModel.Chains)
    }
    //enrolled by
    else if (this.selectedSection == sections.EnrolledBy) {
      this.setPrimaryData(this.filterModel.EnrolledBys)
    }
    //store type
    else if (this.selectedSection == sections.StoreType) {
      this.setPrimaryData(this.filterModel.StoreTypes)
    }

    /* CLIENT SPECIFIC FILTERS*/

    //MwcParentChainName
    else if (this.selectedSection == sections.MwcParentChainName) {
      this.setPrimaryData(this.filterModel.MwcParentChainNames)
    }

    //MwcDivChainName
    else if (this.selectedSection == sections.MwcDivChainName) {
      this.setPrimaryData(this.filterModel.MwcDivChainNames)
    }


    //SalesDirector
    else if (this.selectedSection == sections.SalesDirector) {
      this.setPrimaryData(this.filterModel.SalesDirectors)
    }
    //DsmBrokerManager
    else if (this.selectedSection == sections.DsmBrokerManager) {
      this.setPrimaryData(this.filterModel.DsmBrokerManagers)
    }
    //CdmAccountManager
    else if (this.selectedSection == sections.CdmAccountManager) {
      this.setPrimaryData(this.filterModel.CdmAccountManagers)
    }
    //District
    else if (this.selectedSection == sections.District) {
      this.setPrimaryData(this.filterModel.Districts)
    }
    //SubDistrict
    else if (this.selectedSection == sections.SubDistrict) {
      this.setPrimaryData(this.filterModel.SubDistricts)
    }

    //DistArea
    else if (this.selectedSection == sections.DistArea) {
      this.setPrimaryData(this.filterModel.DistAreas)
    }

    //DistSalesRep
    else if (this.selectedSection == sections.DistSalesRep) {
      this.setPrimaryData(this.filterModel.DistSalesReps)
    }

  }

  private retainSelection(selectedFilterList: SelectedFilterItem[], apiList: Dropdowndata[]): Dropdowndata[] {
    if (!this.checkIfDataExists(apiList)) {
      return apiList;
    }
    if (this.checkIfDataExists(selectedFilterList)) {
      for (let i = 0; i < selectedFilterList.length; i++) {
        for (let j = 0; j < apiList.length; j++) {
          if (selectedFilterList[i].Value == apiList[j].Text) {
            apiList[j].Flag = true;
          }
        }
      }
    }
    return apiList;
  }
}

enum sections {
  None = '',
  Region = 'region',
  Area = 'area',
  Territory = 'territory',
  StoreType = 'storeType',
  Distributor = 'distributor',
  Chain = 'chain',
  EnrolledBy = 'enrolledBy',
  MwcParentChainName = 'mwcParentChainName',
  MwcDivChainName = 'mwcDivChainName',
  SalesDirector = 'salesDirector',
  DsmBrokerManager = 'dsmBrokerManager',
  CdmAccountManager = 'cdmAccountManager',
  District = 'district',
  SubDistrict = 'subDistrict',
  DistArea = 'distArea',
  DistSalesRep = 'distSalesRep',
  RetailArea = 'retailArea',
  RetailSalesRep = 'retailSalesRep',
  KeyAccount = 'keyAccount'
}

enum sectionType {
  SalesHierarchy = 'SalesHierarchy',
  AccountHierarchy = 'AccountHierarchy',
  RetailerAccounts = 'RetailerAccounts',
  Other = 'Other'
}



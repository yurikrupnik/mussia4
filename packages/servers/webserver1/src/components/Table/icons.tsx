import { Icons } from "material-table";
import React, { forwardRef } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import AddBox from "@material-ui/icons/AddBox";
import FilterList from "@material-ui/icons/FilterList";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ViewColumn from "@material-ui/icons/ViewColumn";
// import FileCopy from "@material-ui/icons/FileCopy";

const tableIcons: Icons = {
    // Duplicate: FileCopy,
    // Duplicate: forwardRef((props, ref) => <FileCopy {...props} ref={ref} />),
    // Add: AddBoxIcon,
    // Edit,
    // Check,
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <KeyboardArrowUpIcon {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    // Close: forwardRef((props, ref) => <CloseIcon {...props} ref={ref} />),
    // DetailPanel: ChevronRight,
    // Filter: FilterList,
    // FirstPage,
    // LastPage,
    // NextPage: ChevronRight,
    // PreviousPage: ChevronLeft,
    // ResetSearch: Clear,
    // Search,
    // SortArrow: KeyboardArrowUpIcon,
    // ThirdStateCheck: Remove,
    // ViewColumn,

    // AirplanemodeActiveIcon,
    // DirectionsCarIcon,
    // HotelIcon,
    // RedeemIcon,

    // cars: DriveEtaIcon,
    // flights: FlightIcon,
    // hotels: ApartmentIcon,
    // packages: CardGiftcardIcon,

    // social media links
    // facebook: FacebookIcon,
    // twitter: TwitterIcon,
    // youtube: YouTubeIcon,
    // linkedin: LinkedInIcon,
    // instagram: InstagramIcon,
};

export default tableIcons;

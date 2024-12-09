import React from "react";
import MasterLayout from "../MasterLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import { getFormattedMessage } from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchCountry } from "../../store/action/countryAction";

const CountryList = (props) => {
    const { countries, totalRecord, isLoading, fetchCountry } = props;

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry]);

    const onChange = (filter) => {
        fetchCountry(filter, true);
    };


    const itemsValue =
        countries.length > 0 &&
        countries.map((item)=>({
           id:item?.id,
           name:item?.name,
           phone_code:item?.phone_code,
           status:item?.status,
           short_code:item?.short_code
        }));

        const columns = [
           {
            name: "Country Code",
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",

           },
           {
            name: "Status",
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",

           },

           {
            name: "Phone Code",
            selector: (row) => row.phone_code,
            sortable: true,
            sortField: "phone_code",
           },

           {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            sortField: "status",
           },


           {
            name: "Short Code",
            selector: (row) => row.short_code,
            sortable: true,
            sortField: "short_code",
           },


        ];
    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={"Country"} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                isLoading={isLoading}
                onChange={onChange}
                totalRows={totalRecord}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { countries, totalRecord, isLoading } = state;
    return { countries, totalRecord, isLoading };
};

export default connect(mapStateToProps, {
    fetchCountry,
})(CountryList);

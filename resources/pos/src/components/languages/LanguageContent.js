import React from "react";
import MasterLayout from "../MasterLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import { getFormattedMessage } from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchLanguageContents } from "../../store/action/languageAction";
import { Permissions } from "../../constants";
const LanguageContent = (props) => {
    const { languageContents, fetchLanguageContents, totalRecord, isLoading,allConfigData } =
        props;

    useEffect(() => {
        fetchLanguageContents();
    }, [fetchLanguageContents]);

    // console.log("language contents from redux:", languageContents);

    const onChange = (filter) => {
        fetchLanguageContents(filter, true);
    };


    const goToEditLanguageContent = (item) => {
        const id = item.id;
        window.location.href = "#/app/edit-language-contents/" + id;
    };

    const itemsValue =
        languageContents.length > 0 &&
        languageContents.map((item) => ({
            id: item?.id,
            string: item?.string,
            en: item?.en || "No English translation",
            bn: item?.bn || "No Indonesia translation",
            cn: item?.cn || "No Chinese translation",
            active: item?.active,
            created_at: item?.created_at
                ? getFormattedDate(item?.created_at)
                : "N/A",
        }));

    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: "String",
            selector: (row) => row.string,
            sortable: true,
            sortField: "string",
        },
        {
            name: "English",
            selector: (row) => row.en,
            sortable: true,
            sortField: "en",
        },
        {
            name: "Bahasa Indonesia",
            selector: (row) => row.bn,
            sortable: true,
            sortField: "bn",
        },
        {
            name: "Chinese",
            selector: (row) => row.cn,
            sortable: true,
            sortField: "cn",
        },
        {
            name: "Status",
            selector: (row) => row.active,
            sortable: false,
            sortField: "active",
            cell: (row) => (row.active ? "Active" : "Inactive"),
        },


        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "120px",
            cell: (row) => (
                <ActionButton
                    item={row}
                    goToEditProduct={goToEditLanguageContent}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_LANGUAGE_CONTENT)?true:false}
                    isDeleteMode={false}   
                />
            ),

        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={"Languages Content"} />
            {allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_LANGUAGE_CONTENT)?
            <div className="d-flex justify-content-end">
                <button
                    className=" btn"
                    onClick={() =>
                        (window.location.href =
                            "#/app/create-language-contents")
                    }
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Create
                </button>
            </div>
            :""}
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
    const { languageContents, totalRecord, isLoading ,allConfigData} = state;
    return { languageContents, totalRecord, isLoading ,allConfigData};
};

export default connect(mapStateToProps, {
    fetchLanguageContents,
})(LanguageContent);

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { fetchSalesmans } from "../../store/action/salesmanAction";
import DeleteUser from "./DeleteUser";
import TabTitle from "../../shared/tab-title/TabTitle";
import { getAvatarName, getFormattedDate } from "../../shared/sharedMethod";
import { getFormattedMessage } from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from "../../constants";
const Salesman = (props) => {
    const { totalRecord, isLoading, allConfigData, salesmans, fetchSalesmans } =
        props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };
    const itemsValue =
        salesmans.length >= 0 &&
        salesmans.map((user) => ({
            date: getFormattedDate(
                user.attributes?.created_at,
                allConfigData && allConfigData
            ),
            time: moment(user.attributes?.created_at).format("LT"),
            image: user.attributes?.image,
            first_name: user.attributes?.first_name,
            last_name: user.attributes?.last_name,
            unique_code: user.attributes?.unique_code,
            email: user.attributes?.email,
            phone: user.attributes?.phone,
            password: user.attributes?.password,
            confirm_password: user.attributes?.confirm_password,
            country: user.attributes?.countryDetails?.name,
            region: user.attributes?.regionDetails?.name,
            area: user.attributes?.areaDetails?.name,
            // role_id: user.attributes.role.map(ro => ro.name),
            // role_name: user.attributes?.role.map((role) => role.display_name),
            id: user.id,
        }));
    const onChange = (filter) => {
        fetchSalesmans(filter, true);
    };

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/app/salesman/edit/" + id;
    };

    const goToDetailScreen = (user) => {
        const id = user;
        if (id) {
            window.location.href = "#/app/salesman/detail/" + user;
        } else {
            console.error("ID is undefined for item:", user);
        }
    };

    const columns = [
        {
            name: "Salesman Id",
            selector: (row) => row.unique_code,
            sortField: "unique_code",
            sortable: false,
        },
        {
            name: "Salesman",
            selector: (row) => row.first_name,
            sortField: "first_name",
            sortable: true,
            cell: (row) => {
                const imageUrl = row.image ? row?.image : null;
                const lastName = row.last_name ? row.last_name : "";
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <Link to={`/app/salesman/detail/${row.id}`}>
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        height="50"
                                        width="50"
                                        alt="User Image"
                                        className="image image-circle image-mini"
                                    />
                                ) : (
                                    <span className="custom-user-avatar fs-5">
                                        {getAvatarName(
                                            row.first_name + " " + row.last_name
                                        )}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <div className="d-flex flex-column">
                            <Link
                                to={`/app/salesman/detail/${row.id}`}
                                className="text-decoration-none"
                            >
                                {row.first_name + " " + lastName}
                            </Link>
                            {/* <span>{row.email}</span> */}
                        </div>
                    </div>
                );
            },
        },
        {
            name: "Email & Phone",
            selector: (row) => row.email,
            sortField: "email",
            sortable: false,
            cell: (row) => (
                <div>
                    <div>{row.email}</div>
                    <div>{row.phone}</div>
                </div>
            ),
        },

        {
            name: "Country",
            selector: (row) => row.country,
            sortField: "country",
            sortable: false,
        },
        {
            name: "Region",
            selector: (row) => row.region,
            sortField: "region",
            sortable: false,
        },
        {
            name: "Area",
            selector: (row) => row.area,
            sortField: "area",
            sortable: false,
        },

        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionButton
                    isViewIcon={true}
                    item={row}
                    goToDetailScreen={goToDetailScreen}
                    goToEditProduct={goToEdit}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_SALESMAN)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_SALESMAN)?true:false} 
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Salesman" />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_SALESMAN)?"Add Salesman":""}
                to="#/app/salesman/create"
                totalRows={totalRecord}
                isLoading={isLoading}
            />
            <DeleteUser
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { salesmans, totalRecord, isLoading, allConfigData } = state;
    return { salesmans, totalRecord, isLoading, allConfigData };
};
export default connect(mapStateToProps, { fetchSalesmans })(Salesman);

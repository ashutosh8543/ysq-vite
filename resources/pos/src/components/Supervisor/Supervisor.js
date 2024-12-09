import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import {
    fetchDistributors,
    fetchSupervisor,
} from "../../store/action/userAction";
import DeleteUser from "./DeleteUser";
import TabTitle from "../../shared/tab-title/TabTitle";
import { getAvatarName, getFormattedDate } from "../../shared/sharedMethod";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { placeholderText } from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from "../../constants";

const Supervisor = (props) => {
    const {
        supervisors,
        fetchSupervisor,
        totalRecord,
        isLoading,
        allConfigData,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const itemsValue =
        supervisors.length > 0 &&
        supervisors.map((user) => ({
            date: getFormattedDate(
                user.attributes.created_at,
                allConfigData && allConfigData
            ),
            time: moment(user.attributes.created_at).format("LT"),
            image: user.attributes.image,
            first_name: user.attributes.first_name,
            last_name: user.attributes.last_name,
            unique_code: user.attributes.unique_code,
            email: user.attributes.email,
            phone: user.attributes.phone,
            country: user.attributes.countryDetails?.name,
            region: user.attributes.regionDetails?.name,
            area: user.attributes.areaDetails?.name,
            role_name: user.attributes.role.map((role) => role.display_name),
            id: user.id,
        }));

    const onChange = (filter) => {
        fetchSupervisor(filter, true);
    };

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/app/supervisor/edit/" + id;
    };


    const goToDetailScreen = (user) => {
        const id = user;
        if (id) {
            window.location.href = "#/app/supervisor/detail/" + user;
        } else {
            console.error("ID is undefined for item:", user);
        }
    };

    const columns = [
        {
            name: "Supervisor Id",
            selector: (row) => row.unique_code,
            sortField: "unique_code",
            sortable: false,
        },
        {
            name: "Supervisor",
            selector: (row) => row.first_name,
            sortField: "first_name",
            sortable: true,
            cell: (row) => {
                const { image, first_name, last_name, id, email } = row;
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <Link to={`/app/supervisor/detail/${id}`}>
                                {image ? (
                                    <img
                                        src={image}
                                        height="50"
                                        width="50"
                                        alt="User Image"
                                        className="image image-circle image-mini"
                                    />
                                ) : (
                                    <span className="custom-user-avatar fs-5">
                                        {getAvatarName(
                                            first_name + " " + last_name
                                        )}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <div className="d-flex flex-column">
                            <Link
                                to={`/app/supervisor/detail/${id}`}
                                className="text-decoration-none"
                            >
                                {first_name + " " + (last_name || "")}
                            </Link>
                            {/* <span>{email}</span> */}
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
        // {
        //     name: getFormattedMessage("users.table.phone-number.column.title"),
        //     selector: (row) => row.phone,
        //     sortField: "phone",
        //     sortable: true,
        // },
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
        // {
        //     name: getFormattedMessage(
        //         "globally.react-table.column.created-date.label"
        //     ),
        //     selector: (row) => row.date,
        //     sortField: "created_at",
        //     sortable: true,
        //     cell: (row) => (
        //         <span className="badge bg-light-info">
        //             <div className="mb-1">{row.time}</div>
        //             <div>{row.date}</div>
        //         </span>
        //     ),
        // },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionButton
                    isViewIcon={true}
                    goToDetailScreen={goToDetailScreen}
                    item={row}
                    goToEditProduct={goToEdit}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_SUPERVISOR)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_SUPERVISOR)?true:false} 
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Supervisors" />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_SUPERVISOR)?"Create Supervisor":""}
                to="#/app/supervisor/create"
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
    const { supervisors, totalRecord, isLoading, allConfigData } = state;
    return { supervisors, totalRecord, isLoading, allConfigData };
};

export default connect(mapStateToProps, { fetchSupervisor })(Supervisor);

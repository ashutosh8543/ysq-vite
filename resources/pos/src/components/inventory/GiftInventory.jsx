import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import { useNavigate, Link } from "react-router-dom";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import { allGift } from "../../store/action/giftAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { getFormattedDate } from "../../shared/sharedMethod";
import { Permissions } from "../../constants";
const GiftInventory = (props) => {
    const { allGift, gifts, totalRecord, isLoading ,allConfigData} = props;
    const navigate = useNavigate();



    useEffect(() => {
        allGift();
    }, [allGift]);

    const onChange = (filter) => {
        allGift(filter, true);
    };


    const itemsValue =
        gifts.length >= 0 &&
        gifts.map((item) => ({
            image: item?.image,
            title: item?.title,
            quantity: item?.quantity,
            created_at: getFormattedDate(
                item?.created_at,
                // allConfigData && allConfigData
            ),
            id: item?.id,
        }));


        const handleUpdateQuantityClick = (id) => {
            console.log("clicked id:", id);
            navigate(`/app/gift-inventory-checkout/${id}`);
        };

    const columns = [
        {
            name: getFormattedMessage("globally.input.image.label"),
            selector: (row) => row.image,
            sortable: false,
            sortField: "image",
            cell: (row) => {
                const imageUrl = row.image ? row.image : null;
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            {/* <Link to={`/app/distributors/detail/${row.id}`}> */}
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
                                        row.sales_man_id +
                                            " " +
                                            row.sales_man_id
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("globally.input.gitf_name.label"),
            selector: (row) => row?.title,
            sortable: false,
            sortField: "Name",
        },
        {
            name: getFormattedMessage("globally.input.quantity.label"),
            selector: (row) => row.quantity,
            sortField: "quantity",
            sortable: false,
        },

        {
            name: "Action",
            button: true,
            cell: (row) => (

                allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.UPDATE_GIFT_INVENTORY)
                ?
                <button
                className="btn btn-warning"
                onClick={() => handleUpdateQuantityClick(row.id)}
                style={{
                    display: 'flex',
                    margin: '-16px',
                    padding: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                }}
            >
                Update Quantity
            </button>
            :""

            ),

        },
    ];

    return (
        <MasterLayout>
            <TabTitle title="Gift Inventory" />
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
    const { gifts, totalRecord, isLoading,allConfigData } = state;
    return { gifts, totalRecord, isLoading ,allConfigData};
};

export default connect(mapStateToProps, {
    allGift,
})(GiftInventory);

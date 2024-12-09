import React from "react";
import { connect } from "react-redux";
import DeleteModel from "../../shared/action-buttons/DeleteModel";
import { deleteQuestion } from "../../store/action/surveyAction";

const DeleteQuestion = (props) => {
    const { deleteQuestion, onDelete, deleteModel, onClickDeleteModel } = props;

    const deleteQuestionClick = () => {
        if (onDelete) {
            deleteQuestion(onDelete.id);
            onClickDeleteModel(false);
        }
    };

    return (
        <div>
            {deleteModel && (
                <DeleteModel
                    onClickDeleteModel={onClickDeleteModel}
                    deleteModel={deleteModel}
                    deleteUserClick={deleteQuestionClick}
                    name="Delete successfully"
                />
            )}
        </div>
    );
};

export default connect(null, { deleteQuestion })(DeleteQuestion);

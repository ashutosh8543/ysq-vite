import React, { useState } from "react";
import ModelFooter from "../../shared/components/modelFooter";

function Inputs(props) {
    const { AddQuestionAndOption } = props;

    const [inputList, setInputList] = useState([{ option: "" }]);
    const [formValue, setFormValue] = useState({
        question: "",
        option: "",
        status: "",
    });

    const [errors, setErrors] = useState({
        question: "",
        option: "",
        status: "",
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors("");
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;

        if (!formValue["question"].trim()) {
            errorss["question"] = "Please enter a question";
        }

        if (!formValue["status"].trim()) {
            errorss["status"] = "Please select a status";
        }

        if (inputList.length > 0) {
            inputList.forEach((item) => {
                if (item.option === "") {
                    errorss["option"] = "All Option fields are required";
                } else {
                    isValid = true;
                }
            });
        } else {
            isValid = true;
        }

        setErrors(errorss);
        return isValid;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            formValue.option = inputList;
            setFormValue(formValue);
            AddQuestionAndOption(formValue);
            clearField();
        }
    };

    const clearField = () => {
        setFormValue({
            question: "",
            option: "",
            status: "",
        });
        setErrors("");
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList];
        const remove = list.filter(
            (_, indexFilter) => !(indexFilter === index)
        );
        setInputList(remove);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { option: "" }]);
    };

    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <label className="form-label">Question</label>
                <input
                    type="text"
                    name="question"
                    className="form-control"
                    placeholder="Question"
                    onChange={onChangeInput}
                    value={formValue.question}
                />
                <span className="text-danger d-block fw-400 fs-small mt-2">
                    {errors["question"] ? errors["question"] : null}
                </span>
            </div>

            <div className="col-md-12 mb-3">
                <label className="form-label">Status</label>
                <select
                    name="status"
                    className="form-select"
                    onChange={onChangeInput}
                    value={formValue.status}
                >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <span className="text-danger d-block fw-400 fs-small mt-2">
                    {errors["status"] ? errors["status"] : null}
                </span>
            </div>

            <h3>Options</h3>
            <span className="text-danger d-block fw-400 fs-small mt-2">
                {errors["option"] ? errors["option"] : null}
            </span>
            {inputList.map((x, i) => {
                return (
                    <div className="row" key={i}>
                        <div className="col-sm-8">
                            <input
                                className="form-control mb-2"
                                name="option"
                                placeholder="Option"
                                value={x.option}
                                type="text"
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </div>
                        <div className="btn-box col-sm-4 mb-2">
                            {inputList.length !== 1 && (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleRemoveClick(i)}
                                >
                                    Remove
                                </button>
                            )}
                            {inputList.length - 1 === i && (
                                <button
                                    type="button"
                                    className="btn btn-success m-1"
                                    onClick={handleAddClick}
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
            <ModelFooter
                onSubmit={onSubmit}
                addDisabled={
                    !formValue.question ||
                    !formValue.status ||
                    inputList.length === 0
                }
                link="/app/question"
            />
        </div>
    );
}

export default Inputs;

import {useState} from "react";

interface EditFieldProps {
    title: string;
    type?: React.HTMLInputTypeAttribute;
    hint?: string;
    disabledByDefault?: boolean;
    onToggleEnable: (enabled: boolean) => void;
    onTextChange: (value: string) => void;
}

export default function EditField(
    {
        title,
        type = 'text',
        hint = '',
        disabledByDefault = true,
        onToggleEnable,
        onTextChange,
    }: EditFieldProps) {

    const [isEditable, setIsEditable] = useState(!disabledByDefault);
    const [text, setText] = useState('');

    const handleToggle = () => {
        const newState = !isEditable;
        setIsEditable(newState);
        onToggleEnable(newState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        onTextChange(value); // ✅ מעדכן את האב
    };

    return (
        <>
            <div className="edit-title-container">
                <p className="edit-title">{title}</p>
                <label className="edit-checkbox">
                    <input
                        type="checkbox"
                        checked={isEditable}
                        onChange={handleToggle}
                    />
                </label>
            </div>
            <div className="edit-field">
                <input
                    type={type}
                    placeholder={hint}
                    value={text}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className="edit-input"
                />


            </div>
        </>
    );
};
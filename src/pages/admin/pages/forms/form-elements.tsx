import PageBreadcrumb from "../../components/common/page-bread-crumb";
import PageMeta from "../../components/common/page-meta";
import CheckboxComponents from "../../components/form/form-elements/checkbox-components";
import DefaultInputs from "../../components/form/form-elements/default-inputs";
import DropzoneComponent from "../../components/form/form-elements/drop-zone";
import FileInputExample from "../../components/form/form-elements/file-input-example";
import InputGroup from "../../components/form/form-elements/input-group";
import RadioButtons from "../../components/form/form-elements/radio-buttons";
import SelectInputs from "../../components/form/form-elements/select-inputs";
import TextAreaInput from "../../components/form/form-elements/text-area-input";
import ToggleSwitch from "../../components/form/form-elements/toggle-switch";

export default function FormElements() {
    return (
        <div>
            <PageMeta
                title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="From Elements" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <DefaultInputs />
                    <SelectInputs />
                    <TextAreaInput />
                    {/* <InputStates /> */}
                </div>
                <div className="space-y-6">
                    <InputGroup />
                    <FileInputExample />
                    <CheckboxComponents />
                    <RadioButtons />
                    <ToggleSwitch />
                    <DropzoneComponent />
                </div>
            </div>
        </div>
    );
}

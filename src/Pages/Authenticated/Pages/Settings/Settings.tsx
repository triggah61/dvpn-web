import React from "react";
import Header from "../../Components/Header";
import "../../../../assets/styles/pages/authenticated/pages/setings.scss"
import {ReactComponent as Logo} from '../../../../assets/images/authenticated/pages/settings/logo.svg'
import {ReactComponent as Integration} from '../../../../assets/images/authenticated/pages/settings/integration-icon.svg'
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {DefaultTextField} from "../../../../Components/DefaultTextField";

interface StateInterface {
  passwordRepeat: string;
  password: string;
  error: boolean,
  errorMessage: string
}

const Settings = () => {
  const [values, setValues] = React.useState<StateInterface>({
    passwordRepeat: 'password',
    password: 'password',
    error: false,
    errorMessage: ""
  });

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };
  return (
    <div className="settings wrapper">
      <div className="settings--content">
        <Header logo={Logo} name="Settings"/>
        <div className="settings--blocks">
          <div className="settings--block identity">
            <p className="heading">Identity</p>
            <div className="content">
              <p className="content--title">Node Identity</p>
              <p className="content--id">0x12153f185242cdf1dec4fe338bd4655e517685d5</p>
              <div className="btn btn-filled btn-center identity">Backup private key</div>
            </div>
          </div>
          <div className="settings--block security">
            <p className="heading">Security</p>
            <div className="content">
              <div className="passwords- erapper">
                <Collapse in={values.error}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {values.errorMessage}
                  </Alert>
                </Collapse>
                <div className="password-input-block">
                  <p className="text-field-label">Web UI password</p>
                  <DefaultTextField
                    handleChange={handleTextFieldsChange}
                    password={true}
                    value={values.password}
                    stateName="password"
                  />
                </div>
                <div className="password-repeat-input-block">
                  <p className="text-field-label">Repeat password</p>
                  <DefaultTextField
                    handleChange={handleTextFieldsChange}
                    password={true}
                    value={values.passwordRepeat}
                    stateName="passwordRepeat"
                  />
                </div>
              </div>
              <div className="btn btn-filled btn-center security">Save</div>
            </div>
          </div>
          <div className="settings--block integration">
            <p className="heading">MMN integration</p>
            <div className="content">
              <p className="content--title">API Token (get it <a href="#">here</a>)</p>
              <div className="content--id">
                <p>l3Q45qGFwKKBWJRKAVJN9J34l</p>
                <Integration/>
              </div>
              <div className="btn btn-filled btn-center integration">Save</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

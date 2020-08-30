/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { LOGIN } from '../../constants/routes';
import sideImage from '../../assets/images/onboarding/SideImage.png';
import '../../assets/styles/pages/onboarding/main.scss';

import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TemsAndConditions from './steps/TemsAndConditions';
import PriceSettings from './steps/PriceSettings';
import PayoutSettings from './steps/PayoutSettings';
import PasswordChange from './steps/PasswordSettings';

const Onboarding: FC<any> = () => {
    const [thisState, setThisState] = React.useState({
        currentStep: 0,
    });

    const nextCallback = () => {
        setThisState({ ...thisState, currentStep: thisState.currentStep + 1 });
    };

    const history = useHistory();

    const steps = [
        <Welcome key="welcome" nextCallback={nextCallback} />,
        <TemsAndConditions key="terms" nextCallback={nextCallback} />,
        <PriceSettings key="price" nextCallback={nextCallback} />,
        // Backup is disabled for initial release
        // <Backup key="backup" nextCallback={nextCallback} />,
        <PayoutSettings key="payout" nextCallback={nextCallback} />,
        <PasswordChange key="password" nextCallback={nextCallback} />,
    ];
    const totalStepCount = steps.length;

    if (steps.length - 1 < thisState.currentStep) {
        history.push(LOGIN);
    }
    const nextStepComponent = steps[thisState.currentStep];

    return (
        <div className="onboarding wrapper">
            <div className="steps">
                <div className="steps-content">
                    {nextStepComponent}
                    <StepCounter currentStep={thisState.currentStep} totalStepCount={totalStepCount} />
                </div>
            </div>
            <div className="side">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};

export default Onboarding;

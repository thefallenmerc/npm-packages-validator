import { Request } from "express";
import ValidatorJS, { ErrorMessages, Rules } from "validatorjs";

export default class Validator {

    public validated: any;
    
    protected isValidated = false;
    protected messages: ErrorMessages = {};
    protected rules: Rules = {};
    protected request: Request;
    protected validator: ValidatorJS.Validator<any>;

    constructor(request: Request) {
        this.request = request;
        this.validator = new ValidatorJS(this.request.body, this.rules, this.messages);
    }

    public fails() {
        this.validate();
        return this.validator.fails();
    }

    public passes() {
        this.validate();
        return this.validator.passes();
    }

    get errors(): object {
        this.validate();
        return this.validator.errors.all();
    }

    protected validate() {
        if (!this.isValidated) {
            this.validated = {};
            for (const rule in this.rules) {
                if (this.rules.hasOwnProperty(rule)) {
                    this.validated[rule] = this.request.body[rule];
                }
            }
            this.isValidated = true;
        }
    }

}
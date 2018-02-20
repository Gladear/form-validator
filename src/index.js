import { Validations } from './validations';
import Input from './input';
import Form from './form';
import InputTypes from './inputTypes';

/**
 * Validator
 * @class
 */
class Validator {
  static defaults = {
    forms: [],
    fields: [],
    style: {
      validClass: 'valid',
      invalidClass: 'valid',
    },
  }

  /**
   * Initialize the form validator.
   * @param {Object} options
   */
  constructor(options) {
    const {
      forms,
      fields,
      style,
    } = Object.assign({}, Validator.defaults, options);

    if (!forms && !fields) {
      throw new Error('No forms nor fields defined');
    }

    /**
     * General style for the children of the form validator.
     *
     * @member Validator#style
     * @prop {String} validClass
     * @prop {String} invalidClass
     */
    this.style = style;

    /**
     * Forms controlled by the validator.
     *
     * @member Validator#forms
     * @type {Array.<Form>}
     */
    this.forms = this.initForms(forms);

    /**
     * Input fields controlled by the validator.
     *
     * @member Validator#fields
     * @type {Array.<Input>}
     */
    this.fields = this.initFields(fields);

    this.init();
  }

  initForms = (forms) => {
    // If there's one unique form
    if (!Array.isArray(forms)) {
      return [
        new Form(this, forms),
      ];
    }

    return forms.map(form => new Form(
      this,
      form,
    ));
  }

  initFields = (fields) => {
    // If there's one unique field
    if (!Array.isArray(fields)) {
      return [
        new Input(this, fields),
      ];
    }

    return fields.map(field => new Input(
      this,
      field,
    ));
  }

  init = () => {
    const { forms, fields } = this;

    forms.forEach(form => form.init());
    fields.forEach(input => input.init());
  }
}

export {
  Validator,
  Validations,
  InputTypes,
};

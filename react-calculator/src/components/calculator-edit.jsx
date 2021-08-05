import React, { Fragment } from 'react';
import agent from '../api/agent';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CalculatorEdit = () => {
  const formik = useFormik({
    initialValues: {
      inputOne: '',
      inputTwo: '',
      operator: '',
      result: '',
      id: '',
    },
    validationSchema: Yup.object({
      inputOne: Yup.string().required(),
      inputTwo: Yup.string().required(),
      operator: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      var valuesToCalculate =
        values.inputOne + values.operator + values.inputTwo;
      console.log(valuesToCalculate);

      //calculate..
      calculate(valuesToCalculate);
    },
  });

  //on add..
  const calculate = (valuesToCalculate) => {
    try {
      eval(valuesToCalculate).toString();
      //apiCall..
      agent.Calculation.add({ values: valuesToCalculate }).then((response) => {
        console.log(response);
        formik.setFieldValue('result', response);
      });
    } catch {
      console.log('error');
      formik.setFieldValue('result', 'error');
    }
  };

  //on Reset...
  const onReset = () => {
      formik.resetForm({});
  }

  return (
    <Fragment>
      <div className='d-flex justify-content-center mt-5'>
        <div className='col-md-6'>
          <form onSubmit={formik.handleSubmit}>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='input number'
                {...formik.getFieldProps('inputOne')}
              />

              <select
                className='form-select'
                {...formik.getFieldProps('operator')}
              >
                <option selected value=''>
                  Select Operator
                </option>
                <option value='+'>+</option>
                <option value='-'>-</option>
                <option value='*'>*</option>
                <option value='/'>/</option>
              </select>

              <input
                type='text'
                className='form-control'
                placeholder='input number'
                {...formik.getFieldProps('inputTwo')}
              />

              <button type='sumbit' className='btn btn-primary'>
                =
              </button>

              <input
                type='text'
                className='form-control'
                placeholder='result'
                {...formik.getFieldProps('result')}
                disabled
              />
              <button type='button' className='btn btn-warning' onClick={onReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CalculatorEdit;

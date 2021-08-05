import React, { Fragment, useEffect } from 'react';
import agent from '../api/agent';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Calculator = ({ id, refresh}) => {

  useEffect(() => {
    formik.setFieldValue('id', id);
    if (id > 0) {
      console.log(id);
      agent.Calculation.details(id).then((response) => {
        console.log(response);
        formik.setFieldValue('inputOne', response.num1);
        formik.setFieldValue('operator', response.sign);
        formik.setFieldValue('inputTwo', response.num2);
        formik.setFieldValue('result', response.sum);
      });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      inputOne: '',
      inputTwo: '',
      operator: '',
      result: '',
      id: '',
    },
    validationSchema: Yup.object({
      inputOne: Yup.number().integer().required(),
      inputTwo: Yup.number().integer().required(),
      operator: Yup.string().required(),
    }),
    onSubmit: (values) => {
      
  
      let calObj = {
        num1: parseFloat(values.inputOne),
        num2: parseFloat(values.inputTwo),
        sign: values.operator
      }
      console.log(calObj);
      
      //calculate..
      if (values.id == 0) {
        calculateAdd(calObj);
      } else {
        calculateUpdate(values.id, calObj);
      }
    },
  });

  //add new calculation..
  const calculateAdd = (valuesToCalculate) => {
    try {
      // eval(valuesToCalculate).toString();
      //apiCall..
      agent.Calculation.add(valuesToCalculate).then((response) => {
        console.log(response);
        formik.setFieldValue('result', response.sum);
        formik.setFieldValue('id', response.id);
        refresh();
      });
    } catch {
      console.log('error');
      formik.setFieldValue('result', 'error');
    }
  };

  //update calculation...
  const calculateUpdate = (id, valuesToCalculate) => {
    let idInt = parseInt(id);
    try {
      // eval(valuesToCalculate).toString();
      //apiCall..
      agent.Calculation.update(idInt, {...valuesToCalculate, id: idInt}).then((response) => {
        console.log(response);
        formik.setFieldValue('result', response.sum);
        formik.setFieldValue('id', response.id);
        refresh();
      });
    } catch {
      console.log('error');
      formik.setFieldValue('result', 'error');
    }
  };

  //on Reset...
  const onReset = () => {
    formik.resetForm({});
  };

  return (
    <Fragment>
      <div className='d-flex justify-content-center mt-5'>
        <div className='col-md-6'>
          <form onSubmit={formik.handleSubmit}>
            <div className='input-group mb-3'>
              <input
                type="number"
                className='form-control'
                placeholder='input number'
                {...formik.getFieldProps('inputOne')}
              />

              <select
                className='form-select'
                {...formik.getFieldProps('operator')}
              >
                <option defaultValue value=''>
                  Select Operator
                </option>
                <option value='+'>+</option>
                <option value='-'>-</option>
                <option value='*'>*</option>
                <option value='/'>/</option>
              </select>

              <input
                type="number"
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
              <button
                type='button'
                className='btn btn-warning'
                onClick={onReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Calculator;

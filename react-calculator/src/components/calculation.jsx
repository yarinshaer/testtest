import React, { Fragment, useEffect, useState } from 'react';
import agent from '../api/agent';
import CalculatorEdit from './calculator-edit';
import Calculator from './calculator';

const Calculation = () => {
  const [calculations, setCalculations] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    agent.Calculation.getHistory().then((response) => {
      console.log(response);
      setCalculations(response);
    });
  }, [refresh]);

  const onEdit = (id) => {
    console.log(id);
    setEditId(id);
  };

  const onDelete = (id) => {
    var r = window.confirm('Are You Sure?');
    if (r == true) {
      console.log(id);
      agent.Calculation.delete(id)
        .then((response) => {
          console.log(response);
          setRefresh(Math.random());
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const onRefresh = () => {
    setRefresh(Math.random());
  }

  return (
    <Fragment>
      <Calculator id={editId} refresh={onRefresh} />

      <div className='d-flex justify-content-center mt-5'>
        <div className='col-6'>
          <table class='table table-bordered table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Values</th>
                <th scope='col'>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((item, index) => (
                <tr key={item.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.num1} {item.sign} {item.num2}</td>
                  <td>{item.sum}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={() => onEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Calculation;

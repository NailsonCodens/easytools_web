import React from 'react';

import { Form, Field, Label } from '../../../components/Form/Form';

import './style.css';

export default function Signin() {
  return (
    <>
      <div className="columns is-desktop">
        <div className="column login">
          <div className="hero-body">
            <div className="container">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <Form class={'box'}>
                  <Field classe={'field'}>
                    <Label for={'Email'}>
                      teste
                    </Label>
                  </Field>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="column ads">
          asdasdasdasd
        </div>
      </div>
    </>
  )
}
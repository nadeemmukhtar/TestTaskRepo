import React from 'react';

export default function Reset() {

  return (
    <div className="root">
       <div className="container">
          <div className="row">
              <div className="col-md-12 text-center">
                <div className="wrap-login100">
                  <form className="login100-form validate-form">

                    <span className="login100-form-title p-b-34 p-t-27 mb-5">
                      Reset Password
                    </span>

                    <div className="wrap-input100 validate-input">
                      <input className="input100" type="password" autoComplete="new-password" name="pass" placeholder="New Password"/>
                      <span className="focus-input100" ></span>
                    </div>
                    
                    <div className="wrap-input100 validate-input">
                      <input className="input100" type="password" autoComplete="new-password" name="pass" placeholder="Confirm New Password"/>
                      <span className="focus-input100" ></span>
                    </div>

                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn mb-3">
                        Submit
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

import React from 'react';

export default function Login() {

  return (
    <div className="root">
       <div className="container">
          <div className="row">
              <div className="col-md-12 text-center">
                <div className="wrap-login100">
                  <form className="login100-form validate-form">

                    <span className="login100-form-title p-b-34 p-t-27 mb-5">
                      Log in
                    </span>

                    <div className="wrap-input100 validate-input" data-validate = "Enter username">
                      <input className="input100" type="text" name="username" placeholder="Username"/>
                      <span className="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter password">
                      <input className="input100" type="password" name="pass" placeholder="Password"/>
                      <span className="focus-input100" data-placeholder="&#xf191;"></span>
                    </div>

                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn mb-3">
                        Login
                      </button>
                    </div>

                    <div className="text-center p-t-90">
                      <a className="txt1" href="/forgot">
                        Forgot Password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

import FormClient from "./components/FormClient";
import Menu from "./components/Menu";
import { connect } from 'react-redux';
import Quotation from './components/Quotation';
import Modal from './components/Modal';
import { Route } from 'react-router-dom';
import SearchQuotations from "./components/SearchQuotations";
import './App.css'

function App({modal}) {

  return (
    <div className="App">
      <Route exact path='/'>
        <Menu />
      </Route>

      <Route path='/quotation'>
        <Quotation />
      </Route>

      <Route path='/newclient'>
        <FormClient />
      </Route>

      <Route path='/searchquotation'>
        <SearchQuotations />
      </Route>

      {modal.render && <Modal />}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    modal:state.modal
  }
}
export default connect(mapStateToProps)(App);

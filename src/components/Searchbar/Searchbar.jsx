import { Formik, Form, Field } from 'formik';
import { FaSistrix } from 'react-icons/fa';

import css from './Searchbar.module.css';

const initiatValue = {
  query: '',
};

export default function SearchBar({ onSubmit }) {
  return (
    <header className={css.Searchbar}>
      <Formik initialValues={initiatValue} onSubmit={onSubmit}>
        <Form className={css.SearchForm}>
          <button type="submit" className={css.SearchForm__button}>
            <span>
              <FaSistrix width="48" height="48" />
            </span>
          </button>

          <Field
            name="query"
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
}

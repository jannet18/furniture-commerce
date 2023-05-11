
import React from 'react';
import { Container } from 'reactstrap';
import "../../pages/sytles/MainSection.css";

const MainSection = ({title}) => {
  return (
    <section className="main__section">
        <Container className='text-center'>
            <h1>{title}</h1>
        </Container>
    </section>
  )
}

export default MainSection
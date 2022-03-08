import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';

export const Container = styled.div`
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(06px + 2vmin);
`;

export const DialogPartido = styled(Dialog)`
    width: 450px;
`;


export const ModelLogin = styled.div`
    width:  500px;
    margin:2;
`;

export const BordaCampo = styled.div`
    margin:10px;
`;

import axios from 'axios';

export class PartidoService {
    getPartidos() {
        return axios.get('assets/demo/data/partidos.json').then(res => res.data);
    }
}

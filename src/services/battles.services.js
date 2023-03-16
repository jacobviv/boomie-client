import axios from 'axios'

class BattleService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/battles`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getBattles() {
        return this.api.get('/getAllBattles')
    }

    getBattlesByUser(id) {
        return this.api.get(`/battlesForCurrentUser/${id}`)
    }

    getBattleDetails(battle_id) {
        return this.api.get(`/details/${battle_id}`)
    }

    getBattlesInfo() {
        return this.api.get('/getBattlesInfo')
    }

    saveBattle(battleData) {
        return this.api.post('/create', battleData)
    }

    getBattleByOwner(id) {
        return this.api.get(`/battleByOwner/${id}`)
    }
    editBattleById(battle_id, battleData) {
        return this.api.put(`/edit/${battle_id}`, battleData)
    }
    deleteBattleById(battle_id) {
        return this.api.delete(`/delete/${battle_id}`)
    }

    getFilteredBattlesName(query) {
        // TODO
        // enviar la query al servidor para recibir las battles que contienen ese texto
    }

}

const battlesService = new BattleService()

export default battlesService
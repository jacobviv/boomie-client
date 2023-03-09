import axios from 'axios'

class BattleService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/battles`
        })
    }

    getBattles() {
        return this.api.get('/getAllBattles')
    }

    getBattleDetails(battle_id) {
        return this.api.get(`/details/${battle_id}`)
    }

    saveBattle(battleData) {
        return this.api.post('/saveBattle', battleData)
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

}

const battlesService = new BattleService()

export default battlesService
import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = e => {
    e.persist()
    this.setState(prev => {
      return {
        filters: {
          ...prev.filters,
          type: e.target.value
        }
      }
    })
  }

  onFindPetsClick = e => {
    let type = this.state.filters.type
    let url = "/api/pets" + (type && type !== "all" ? `?type=${type}` : "")
    console.log(url)
    fetch(url)
    .then(resp => resp.json())
    .then(pets => this.setState({pets}))
  }

  onAdoptPet = id => {
    console.log(id)
    this.setState(prev => {
      let pet = prev.pets.find(pet => pet.id === id)
      pet.isAdopted = true
      return prev
    })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={e => this.onChangeType(e)}
                onFindPetsClick={e => this.onFindPetsClick(e)}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={id => this.onAdoptPet(id)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

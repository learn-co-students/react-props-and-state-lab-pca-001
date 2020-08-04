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

  onChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    const type = this.state.filters.type
    const query = type && type !== "all" ? `?type=${type}` : ""
    const url = "/api/pets" + query

    fetch(url)
    .then(resp => resp.json())
    .then(pets => this.setState({pets}))
  }

  onAdoptPet = id => {
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
                onChangeType={event => this.onChangeType(event)}
                onFindPetsClick={this.onFindPetsClick}/>
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

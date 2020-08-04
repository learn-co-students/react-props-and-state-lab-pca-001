import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { PrefetchPlugin } from 'webpack'

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
    event.persist()
    this.setState(previousState => {
      return {
        filters: {
          ...previousState.filters,
          type: event.target.value
        }
      }
    })
  }

  onFindPetsClick = () => {
    let type = this.state.filters.type

    fetch("/api/pets" + (type && type !== "all" ? `?type=${type}` : ""))
    .then(resp => resp.json())
    .then(pets => this.setState({pets}))
  }

  onAdoptPet = id => {
    let newPet = this.state.pets.find(pet => pet.id === id)

    newPet.isAdopted = true
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
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

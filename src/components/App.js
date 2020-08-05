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

  handleChange = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    });
  }

  handlePetsClick = () => {
    if (this.state.filters.type === 'all') {
      fetch(`/api/pets`)
      .then(response => response.json())
      .then(pets => this.setState({pets: pets}))
    }
    else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(response => response.json())
      .then(pets => this.setState({pets: pets}))
    }
  }

  handleAdopt = (petId) => {
    const selectedPet = this.state.pets.find(pet => pet.id == petId);
    selectedPet.isAdopted = true;

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
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handlePetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
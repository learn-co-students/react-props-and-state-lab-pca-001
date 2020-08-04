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

  onChangeType = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.fitlers,
          type: event.target.value
        }
      }
    })
  }

  fetchPets = (event) => {
    let url = '/api/pets'

    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
      .then(resp => resp.json())
      .then(petData => this.setState({ petData }) )
  }

  // onAdoptPet = (petId) => {
  //   this.setState({
  //     pets: this.state.pets.map(pet => {
  //       if (pet.id === petId) {
  //         return {...pet, isAdopted: true }
  //       } else {
  //         return pet
  //       }
  //     })
  //   })
  // }

  onAdoptPet = (petId) => {
    this.setState(prevState => {
      let pet = prevState.pets.find( pet => pet.id === petId)
      pet.isAdopted = true
      return prevState
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
              onFindPetsClick={event => this.fetchPets(event)} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={petId => this.onAdoptPet(petId)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

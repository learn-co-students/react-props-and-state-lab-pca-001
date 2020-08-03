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
    this.getPets();
  }

  getPets = () => {
    const type = this.state.filters.type;
    const url = `/api/pets${type === 'all' ? '' : `?type=${type}`}`
    fetch(url)
      .then( res => res.json())
      .then( serverPets => this.setState( prev => {
        let {pets, filters} = prev;
        pets = serverPets;
        return { pets, filters }
      }))
      .catch(err => console.log(err));
  }


  onChangeType = (type) => {
    this.setState({
      filters: { type }
    })
  }

  // better way than a shallow copy and assigning cpy to pets
  onAdoptPet = (petID) => {
    const i = this.state.pets.findIndex( p => p.id === petID );
    if(i >= 0 ){
      const newPets = [...this.state.pets];
      newPets[i].isAdopted = true;
      this.setState({ pets: newPets });
    } else {
      console.log({petID, i, pets: this.state.pets});
    }
  }

  onFindPetsClick = () => this.getPets();

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
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

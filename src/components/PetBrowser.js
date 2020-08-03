import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  buildPet(pet) {
    return <Pet onAdoptPet={this.props.onAdoptPet} key={pet.id} pet={pet}/>
  }

  buildPetComponents() {
    return this.props.pets.map(pet => this.buildPet(pet))
  }

  render() {
    return <div className="ui cards">{this.buildPetComponents()}</div>
  }
}

export default PetBrowser

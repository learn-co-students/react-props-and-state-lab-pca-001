import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  createPet(pet) {
    return <Pet onAdoptPet={this.props.onAdoptPet} key={pet.id} pet={pet}/>
  }

  petComponents() {
    return this.props.pets.map(pet => this.createPet(pet))
  }

  render() {
    return <div className="ui cards">{this.petComponents()}</div>
  }
}

export default PetBrowser

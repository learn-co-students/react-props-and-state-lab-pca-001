import React from 'react'

class Pet extends React.Component {

  adopt = () => <button
    className="ui primary button"
    onClick={this.props.onAdoptPet(this.props.pet.id)}
  >Adopt pet</button>;

  disabled = () => <button className="ui disabled button">Already adopted</button>;

  check = () => {
    if(this.props.hasOwnProperty('onAdoptPet')){
      return this.adopt();
    }else {
      return <button
      className="ui primary button"
    >Adopt pet</button>;
    }
  }

  render() {
    const {name, type, age, weight, gender, isAdopted} = this.props.pet;
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {/*'♀' OR '♂' */}
            {gender !== 'male' ?  <p>♀</p> : <p>♂</p> }
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
          { isAdopted ? this.disabled() : this.check() }
        </div>
      </div>
    )
  }
}

export default Pet

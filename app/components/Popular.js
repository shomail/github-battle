import React from 'react';

function LanguagesNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
    <ul className='flex-center'>
        {languages.map((lang) => (
            <li key={lang}>
                <button 
                type="button" 
                className='btn-clear nav-link'
                style={lang === selected ? {color: 'lightcoral'}: null} 
                onClick={() => onUpdateLanguage(lang)}
                >
                    {lang}
                </button>
            </li>
        ))}
    </ul>
    )
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
        }

        this.updateLanguage = this.updateLanguage.bind(this)
    }
    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const {selectedLanguage} = this.state;
        return (
            <>
                <LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />
            </>
        )
    }
}

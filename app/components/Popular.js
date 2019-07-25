import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

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

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
            error: null,
        }

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            erroor: null,
            repos: null,
        })

        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos,
                error: null,
            }))
            .catch((error) => {
                console.warn('Error fetching repos: ', error)
                this.setState({
                    error: `There was an error fetching the repositories.`,
                })
            })
    }

    isLoading() {
        return this.state.repos === null && this.state.error === null;
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;
        return (
            <>
                <LanguagesNav 
                    selected={selectedLanguage} 
                    onUpdateLanguage={this.updateLanguage} 
                />
                {this.isLoading() && <p>LOADING...</p>}

                {error && <p>{error}</p>}

                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </>
        )
    }
}

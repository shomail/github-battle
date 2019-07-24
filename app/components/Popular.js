import React from 'react';

export default class Popular extends React.Component {
    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        return (
            <ul className='flex-center'>
                {languages.map((lang) => (
                    <li key={lang}>
                        <button type="button" className='btn-clear nav-link'>{lang}</button>
                    </li>
                ))}
            </ul>
        )
    }
}

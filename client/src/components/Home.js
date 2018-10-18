import React from 'react';
import View from '../layout/View';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../actions/profilesActions';
import noPic from '../../static/images/no_pic.png';

class Home extends React.Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profiles.length) {
            console.log(nextProps.profile);
        }
    }

    render() {
        const { profiles, loading } = this.props.profile;

        const renderProfile = profiles.map((profile) => {
            return (
                <li key={profile._id}>{profile.user.name}</li>
            )
        });

        return (
            <View>
                <Helmet>
                    <title>Boilerplate React Fullstack</title>
                </Helmet>
                
                <Container>
                    <br />
                    <h1>Hello React</h1>
                    <hr style={{margin: '25px 0'}} />

                    <div>
                        <h2>List of Users</h2>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul style={{marginLeft: '25px'}}>
                                { renderProfile }
                            </ul>
                        )}

                        {!loading && profiles.length == 0 && <p>Something went wrong..</p>}
                    </div>
                    <hr style={{margin: '25px 0'}} />

                    <div>
                        <p>import noPic from '../../static/images/no_pic.png'</p>
                        <img src={noPic} alt="no pic"/>
                    </div>
                    <hr style={{margin: '25px 0'}} />
                    <div>
                        <p>require('../../static/images/no_pic.png')</p>
                        <img src={require('../../static/images/no_pic.png')} alt="no pic 2"/>
                    </div>
                </Container>
            </View>
        );
    }

};

Home.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getProfiles })(Home);
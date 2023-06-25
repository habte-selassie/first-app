import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const About = () => {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [editMission, setEditMission] = useState(false);
  const [editVision, setEditVision] = useState(false);
  const [editObjectives, setEditObjectives] = useState(false);
  const [missionText, setMissionText] = useState('');
  const [visionText, setVisionText] = useState('');
  const [objectiveText, setObjectiveText] = useState('');

  useEffect(() => {
    // Fetch mission data
    axios
      .get('http://localhost:8000/api/mission/')
      .then(response => {
        setMission(response.data.title);
      })
      .catch(error => {
        console.error('Error fetching mission data', error);
      });

    // Fetch vision data
    axios
      .get('http://localhost:8000/api/vision/')
      .then(response => {
        setVision(response.data.title);
      })
      .catch(error => {
        console.error('Error fetching vision data:', error);
      });

    // Fetch objectives data
    axios
      .get('http://localhost:8000/api/objectives/')
      .then(response => {
        setObjectives(response.data);
      })
      .catch(error => {
        console.error('Error fetching objectives data:', error);
      });
  }, []);

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 800,
    color: theme.palette.text.primary,
  }));

  const handleMissionSave = () => {
    axios
      .post('http://localhost:8000/api/mission/update/', {
        mission_id: mission.id,
        title: missionText,
        description: mission.description
      })
      .then(response => {
        setMission(response.data.title);
        setEditMission(false);
      })
      .catch(error => {
        console.error('Error updating mission data:', error);
      });
  };
  
  const handleMissionDelete = () => {
    axios
      .post('http://localhost:8000/api/mission/delete/', {
        mission_id: mission.id
      })
      .then(() => {
        setMission('');
        setEditMission(false);
      })
      .catch(error => {
        console.error('Error deleting mission data:', error);
      });
  };
  
  const handleMissionEdit = () => {
    setEditMission(true);
  };

  const handleVisionEdit = () => {
    setEditVision(true);
  };

  const handleObjectivesEdit = () => {
    setEditObjectives(true);
  };

  //const handleMissionSave = () => {
  //   axios
  //     .put('http://localhost:8000/api/mission/', { title: missionText })
  //     .then(response => {
  //       setMission(response.data.title);
  //       setEditMission(false);
  //     })
  //     .catch(error => {
  //       console.error('Error updating mission data:', error);
  //     });
  // };

  const handleVisionSave = () => {
    axios
      .put('http://localhost:8000/api/vision/', { title: visionText })
      .then(response => {
        setVision(response.data.title);
        setEditVision(false);
      })
      .catch(error => {
        console.error('Error updating vision data:', error);
      });
  };

  const handleObjectivesSave = () => {
    // Assuming objectives are saved individually
    axios
      .put('http://localhost:8000/api/objectives/', { title: objectiveText })
      .then(response => {
        setObjectives([...objectives, response.data]);
        setEditObjectives(false);
      })
      .catch(error => {
        console.error('Error updating objectives data:', error);
      });
  };

  // const handleMissionDelete = () => {
  //   axios
  //     .delete('http://localhost:8000/api/mission/')
  //     .then(() => {
  //       setMission('');
  //       setEditMission(false);
  //     })
  //     .catch(error => {
  //       console.error('Error deleting mission data:', error);
  //     });
  // };

  const handleVisionDelete = () => {
    axios
      .delete('http://localhost:8000/api/vision/')
      .then(() => {
        setVision('');
        setEditVision(false);
      })
      .catch(error => {
        console.error('Error deleting vision data:', error);
      });
  };

  const handleObjectiveDelete = (objectiveId) => {
    axios
      .delete(`http://localhost:8000/api/objectives/${objectiveId}`)
      .then(() => {
        const updatedObjectives = objectives.filter(objective => objective.id !== objectiveId);
        setObjectives(updatedObjectives);
        setEditObjectives(false);
      })
      .catch(error => {
        console.error('Error deleting objective data:', error);
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, marginTop: '-100px' }}>
        <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, height: '460px', marginTop: '30px' }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <img
                style={{ width: '900px', height: '210px', marginTop: '-80px', marginLeft: '-65px' }}
                src={require('.././web-components/assets/border-1.png')}
                alt=""
              />

              <Typography
                variant="h5"
                component="div"
                sx={{
                  textDecoration: 'underline',
                  textDecorationColor: 'yellowgreen',
                  textDecorationStyle: 'solid',
                  fontWeight: 'bold',
                  color: 'yellowgreen',
                  marginTop: '-40px',
                }}
              >
                About Lorem Ipsum
              </Typography>
              <Typography variant="body2" sx={{ marginTop: '30px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus, felis at consectetur malesuada,
                odio erat volutpat enim, nec feugiat velit justo vel neque. Nulla dictum quam eu lacus tincidunt
                ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Mauris nec tellus eget mauris consequat lacinia. Nulla posuere nibh sit amet justo lacinia, eget
                aliquet elit vestibulum. Fusce suscipit ligula et dui varius varius. Sed ac dui faucibus, mollis erat
                nec, facilisis lectus. Sed lobortis consectetur quam, id pharetra dui malesuada non. Donec et nunc non
                massa iaculis suscipit ut ut lorem. Curabitur sit amet fermentum lectus.
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ minWidth: 275, backgroundColor: 'white', marginTop: '20px', width: '300px', marginLeft: '50px' }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                textDecoration: 'underline',
                textDecorationColor: 'yellowgreen',
                textDecorationStyle: 'solid',
                fontWeight: 'bold',
                color: 'yellowgreen',
              }}
            >
              Mission
            </Typography>
            {!editMission ? (
              <>
                <Typography variant="body2">{mission}</Typography>
                <Button variant="contained" onClick={handleMissionEdit} sx={{ marginTop: '10px', marginRight: '5px' }}>
                  Edit
                </Button>
                <Button variant="contained" onClick={handleMissionDelete} sx={{ marginTop: '10px' }}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Mission Text"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={missionText}
                  onChange={e => setMissionText(e.target.value)}
                  sx={{ marginBottom: '10px' }}
                />
                <Button variant="contained" onClick={handleMissionSave} sx={{ marginRight: '10px' }}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setEditMission(false)}>
                  Cancel
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275, backgroundColor: 'white', marginTop: '20px', width: '300px', marginLeft: '50px' }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                textDecoration: 'underline',
                textDecorationColor: 'yellowgreen',
                textDecorationStyle: 'solid',
                fontWeight: 'bold',
                color: 'yellowgreen',
              }}
            >
              Vision
            </Typography>
            {!editVision ? (
              <>
                <Typography variant="body2">{vision}</Typography>
                <Button variant="contained" onClick={handleVisionEdit} sx={{ marginTop: '10px', marginRight: '5px' }}>
                  Edit
                </Button>
                <Button variant="contained" onClick={handleVisionDelete} sx={{ marginTop: '10px' }}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Vision Text"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={visionText}
                  onChange={e => setVisionText(e.target.value)}
                  sx={{ marginBottom: '10px' }}
                />
                <Button variant="contained" onClick={handleVisionSave} sx={{ marginRight: '10px' }}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setEditVision(false)}>
                  Cancel
                </Button>
              </>
            )}
          </CardContent>
        </Card>















        <Card sx={{ minWidth: 275, backgroundColor: 'white', marginTop: '20px', width: '300px', marginLeft: '50px' }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                textDecoration: 'underline',
                textDecorationColor: 'yellowgreen',
                textDecorationStyle: 'solid',
                fontWeight: 'bold',
                color: 'yellowgreen',
              }}
            >
              Objectives
            </Typography>
            {!editObjectives ? (
              <>
                <Typography variant="body2">{objectives}</Typography>
                <Button variant="contained" onClick={handleObjectivesEdit} sx={{ marginTop: '10px', marginRight: '5px' }}>
                  Edit
                </Button>
                <Button variant="contained" onClick={handleObjectiveDelete} sx={{ marginTop: '10px' }}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Vision Text"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={visionText}
                  onChange={e => setObjectiveText(e.target.value)}
                  sx={{ marginBottom: '10px' }}
                />
                <Button variant="contained" onClick={handleObjectivesSave} sx={{ marginRight: '10px' }}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setEditObjectives(false)}>
                  Cancel
                </Button>
              </>
            )}
          </CardContent>
        </Card>












      </div>
    </>
  );
};

export default About;

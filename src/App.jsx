import './App.css'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

function App() {

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#b8a4d4',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const initialScores = {
    presente: [
      { question: 'Puedo estar en paz con la incertidumbre y la ambigüedad del presente (El no saber)', score: 0 },
      { question: 'Dedico tiempo regularmente a actividades que realmente disfruto y que me conectan con el presente.', score: 0 },
      { question: 'Frecuentemente realizo prácticas para entrenar mi mente para estar en el presente. Por ejemplo: Mindfulness, respiración consciente.', score: 0 },
      { question: 'Mi mente está más tiempo en el presente que rumiando mi pasado o preocupándome por el futuro.', score: 0 }
    ],
    emocional: [
      { question: 'Me permito reconocer, sentir y expresar una variedad de emociones, incluso aquellas consideradas "negativas".', score: 0 },
      { question: 'Tengo herramientas para afrontar el conflicto crear estados emocionales más placenteros.', score: 0 },
      { question: 'Tengo la determinación para  estar más tiempo en estados emocionales positivos .', score: 0 },
      { question: 'Confio en la información valiosa que mis emociones proporcionan sobre mis necesidades.', score: 0 }
    ],
    mental: [
      { question: 'Puedo observar mis pensamientos sin identificarme completamente con ellos.', score: 0 },
      { question: 'Soy consciente de cúales pensamientos afectan mi estado de ánimo y bienestar emocional.', score: 0 },
      { question: 'Me resulta fácil dejar ir pensamientos que no son útiles o constructivos.', score: 0 },
      { question: 'Cultivo pensamientos positivos y optimistas, incluso en medio de la diversidad para afrontar desafios con determinación y esperanza .', score: 0 }
    ],
    autoconcepto: [
      { question: 'Reconozco, valoro y  celebro mis logros y habilidades.', score: 0 },
      { question: 'Tengo una comprensión clara y realista de mis fortalezas y debilidades.', score: 0 },
      { question: 'Tengo clara mi visión personal de quien quiero ser, hacer y tener.', score: 0 },
      { question: 'Estoy satisfecho con las acciones que estoy realizando hoy para el cumplimiento de mis sueños y metas.', score: 0 }
    ],
    corporal: [
      { question: 'Presto atención a las sensaciones físicas de mi cuerpo ante mis emociones y  situaciones.', score: 0 },
      { question: 'Practico actividades que fomentan la conexión mente-cuerpo.', score: 0 },
      { question: 'Tengo habitas de descanso y recuperación corporal.', score: 0 },
      { question: 'Me permito experimentar y disfrutar de las sensaciones físicas sin juicios.', score: 0 }
    ],
    espiritual: [
      { question: 'Practico regularmente actividades que nutren y elevan mi consciencia espiritual.', score: 0 },
      { question: 'Experimento una sensación de paz interior y calma incluso en medio de desafios y situaciones díficiles.', score: 0 },
      { question: 'Mi intuición y sabiduría interna son fuentes importantes de guía en mi vida.', score: 0 },
      { question: 'Me siento conectado con algo más grande que yo mismo.', score: 0 }
    ],
    pasado: [
      { question: 'He logrado aceptar y reconciliarme con eventos dolorosos de mi historia.', score: 0 },
      { question: 'He logrado que mi mente ya no reviva el pasado con frecuencia.', score: 0 },
      { question: 'He logrado dar un nuevo significado (gratitud y aprendizaje) a los eventos del pasado.', score: 0 },
      { question: 'Me he perdonado a mi mismo y a los otros  por decisiones o situaciones del pasado.', score: 0 }
    ],
    futuro: [
      { question: 'Confio en que ante los sucesos del futuro, tendré los recursos para gestionarlos asertivamente.', score: 0 },
      { question: 'Tengo una actitud de "dejarme sorprender de la vida con lo que trae en el futuro", se que será para mi bien.', score: 0 },
      { question: 'Creo acciones concretas que puedo realizar para mejorar mi situación a futuro.', score: 0 },
      { question: 'He encontrado herramientas para gestionar mis temores sobre el futuro.', score: 0 }
    ],
    vida_propia: [
      { question: 'Siempre que una situación me incomoda, tengo el habito de preguntarme ¿Esto que tiene que ver conmigo?', score: 0 },
      { question: 'Tomo medidas proactivas para cuidar de mi estado emocional, espíritual y físico (Cuidado de la salud, tiempo de diversión, equilibrio trabajo-vida personal) ', score: 0 },
      { question: 'Me estoy haciendo cargo de cambiar los aspectos de mi vida que no me satisfacen.', score: 0 },
      { question: 'Tengo una mentalidad fuerte para mantenerme firme en mis valores y metas a pesar de mis obstaculos.', score: 0 }
    ],
    otros: [
      { question: 'Disfruto la compañia de quienes me rodean y puedo trabajar con otros.', score: 0 },
      { question: 'Puedo ponerme en el lugar de otra persona, escuchar  y entender sus emociones y perspectivas.', score: 0 },
      { question: 'Me importa genuinamente el bienestar de las personas que me rodean.', score: 0 },
      { question: 'Disfruto teniendo actos de generosidad, bondad y cuidado con los demás sin esperar nada a cambio.', score: 0 }
    ]
  };

  const [scores, setScores] = useState(initialScores);
  const [rawScores, setRawScores] = useState([]);

  const handleScoreChange = (category, index, event) => {
    const newScores = { ...scores };
    newScores[category][index].score = parseInt(event.target.value);
    setScores(newScores);
    console.log("SCORE ACTUALIZADO: ", newScores[category][index]);
  };

  useEffect(() => {
    const extractedScores = Object.values(scores).map(category =>
      category.reduce((total, item) => total + item.score, 0) / category.length
    );
    setRawScores(extractedScores);
    console.log("NUEVOS SCORE: ", extractedScores);
  }, [scores]);
  

  return (
    <Grid container spacing={2} 
    alignItems="center"
    justifyContent="center">
      <Grid xs={12} className="header-title">
        <h1>LA RUEDA DE LA VIDA</h1>
        <div className='justify-text'>
          <p>La rueda de la vida es una herramienta muy eficaz para mejorar el equilibrio de tu vida. Te ayuda a identificar gráficamente las áreas en tu vida en las cuáles hay que dedicarles más energía y más trabajo, y en muy poco tiempo. También te ayuda a entender en donde necesitas establecer un límite.</p>
          <p>Esta herramienta está dividida en categorías o áreas diferentes que son importantes para la mayoría de nosotros. La forma en que funciona esta rueda de la vida, es que nosotros mismo evaluamos nuestro nivel de satisfacción en cada una de las áreas o categorías, es decir, que asignamos una puntuación de 1 a 10, donde 1 es muy en desacuerdo con la oración y 10 es muy deacuerdo con la oración</p>
        </div>
      </Grid>
      {scores && (
        <>
          {/* PRESENTE */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.presente.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('presente', index, event)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* EMOCIONAL */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.emocional.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('emocional', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* MENTAL */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.mental.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('mental', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* AUTOCONCEPTO */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.autoconcepto.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('autoconcepto', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* CORPORAL */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.corporal.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('corporal', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* ESPIRITUAL */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.espiritual.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('espiritual', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* PASADO */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.pasado.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('pasado', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* FUTURO */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.futuro.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('futuro', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* VIDA PROPIA */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.vida_propia.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('vida_propia', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* OTROS */}
          <Grid xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Relación con el presente</StyledTableCell>
                    <StyledTableCell align="right">Puntuación</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.otros.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TextField
                          type="number"
                          value={row.score}
                          id="outlined-number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => handleScoreChange('otros', index, event)} // Pass the category name
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}
      {rawScores && (
        <Grid xs={8}>
        <PolarArea data={{
          labels: ['Relación con mi dimensión emocional', 'Relación con mi dimensión mental', 'Autoconcepto - Autorrealización', 'Relación con mi dimensión corporal', 'Relación con mi dimensión espiritual', 'Relación con el pasado', 'Relación con el futuro', 'Responsabilidad sobre mi propia vida', 'Relación con otros', 'Relación con el presente'],
          datasets: [
            {
              label: 'Afinidad',
              data: rawScores,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            r: {
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 18
                }
              }
            }
          },
            labels: [
              {
                render: 'label',
                fontColor: '#000',
                position: 'outside'
              },
              {
                render: 'percentage',
                fontColor: ['green', 'white', 'red'],
                precision: 2
              }
            ]
        }}
        plugins= {{
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Polar Area Chart With Centered Point Labels'
          }
        }}
        >

        </PolarArea>
      </Grid>
      )}
      
    </Grid>
  )
}

export default App

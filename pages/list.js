import { useSelector, useDispatch } from 'react-redux';
import RightDrawer from '../components/RightDrawer';
import { Box, Button, Container, OutlinedInput, TextField } from '@mui/material';
import { BsImage } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineUpload } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { listCar } from '../actions/list.action';
import { checkSignin } from '../actions/auth.action';

export default function List() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSignin());
  }, []);
  const [front, setFront] = useState([]);
  const [back, setBack] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [interior, setInterior] = useState([]);
  const [carCompany, setCarCompany] = useState('');
  const [modelName, setModelName] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [kilometersDriven, setKilometersDriven] = useState('');
  const [condition, setCondition] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [step, setStep] = useState(1);

  const [file, setFile] = useState([]);

  const submitForm = () => {
    const form = new FormData();
    form.append('carCompany', carCompany);
    form.append('modelName', modelName);
    form.append('modelYear', modelYear);
    form.append('description', description);
    form.append('color', color);
    form.append('kilometersDriven', kilometersDriven);
    form.append('condition', condition);
    form.append('basePrice', basePrice);
    form.append('fullPrice', fullPrice);

    for (let pic of file) {
      form.append('image', pic);
    }

    dispatch(listCar(form));
  };

  useEffect(() => {
    setFile([...front, ...back, ...left, ...right, ...interior]);
    console.log(file);
  }, [front, back, left, right, interior, step]);

  const desc =
    "The 2022 Ford Bronco Everglades build off the Bronco Black Diamond w model with additional features like a standard Bronco-first, factory-installed Ford Performance by WARN@ winch kit and air-intake snorkel. Combined with a 2.3L EcoBooste engine and the Sasquatch TM Package — it's built to help you confidently splash through water and take on dusty trails.";

  const renderStepOne = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={halfSizedInput}>
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Company"
                variant="outlined"
                value={carCompany}
                onChange={(e) => setCarCompany(e.target.value)}
              />
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Model Name"
                variant="outlined"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </Box>
            <TextField
              sx={textField}
              id="outlined-basic"
              label="Color"
              variant="outlined"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Box sx={halfSizedInput}>
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Model Year"
                variant="outlined"
                value={modelYear}
                onChange={(e) => setModelYear(e.target.value)}
              />
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Kilometers Driven"
                variant="outlined"
                value={kilometersDriven}
                onChange={(e) => setKilometersDriven(e.target.value)}
              />
            </Box>

            <Box sx={halfSizedInput}>
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Base Price"
                variant="outlined"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
              <TextField
                sx={textField}
                id="outlined-basic"
                label="Sticker Price"
                variant="outlined"
                value={fullPrice}
                onChange={(e) => setFullPrice(e.target.value)}
              />
            </Box>
            <TextField
              sx={textField}
              // fullWidth
              id="outlined-basic"
              label="Describe your car briefly"
              variant="outlined"
              value={description}
              multiline
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              sx={textField}
              // fullWidth
              id="outlined-basic"
              label="Describe your car's condition"
              variant="outlined"
              value={condition}
              multiline
              rows={2}
              onChange={(e) => setCondition(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '50%', mx: 'auto', my: '5px' }}
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </Box>
        </form>
      </Box>
    );
  };
  const renderStepTwo = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload front profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setFront([...front, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {front.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <BsImage size="2em" color="MediumSeaGreen" />
                  <Box>{e.name}</Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setFront((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Box >
              <Button variant="contained" color="secondary" onClick={() => setStep(1)} sx={nextButton}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setStep(3)} sx={nextButton}>
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };
  const renderStepThree = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload rear profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setBack([...back, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {back.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <BsImage size="2em" color="MediumSeaGreen" />
                  <Box>{e.name}</Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setBack((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Button variant="contained" color="secondary" sx={nextButton} onClick={() => setStep(4)}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepFour = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload right profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setRight([...right, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {right.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <BsImage size="2em" color="MediumSeaGreen" />
                  <Box>{e.name}</Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setRight((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Button variant="contained" color="secondary" sx={nextButton} onClick={() => setStep(5)}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepFive = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload left profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setLeft([...left, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {left.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <BsImage size="2em" color="MediumSeaGreen" />
                  <Box>{e.name}</Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setLeft((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
            <Button variant="contained" color="secondary" sx={nextButton} onClick={() => setStep(6)}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    );
  };

  const renderStepSix = () => {
    return (
      <Box sx={stepOneWrapper}>
        <form>
          <Box sx={stepOneFormStyle}>
            <Box sx={stepHeading}>Upload interior profile pictures</Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={uploadText}>
                <AiOutlineUpload size="2em" />
                <Box>Upload or drag images here</Box>
              </Box>
              <OutlinedInput
                name="image"
                sx={OutlinedInputStyle}
                type="file"
                onChange={(event) => setInterior([...interior, event.target.files[0]])}
              />
            </Box>

            <Box sx={imageNamePreviewWrap}>
              {interior.map((e, i) => (
                <Box key={i} sx={imageNamePreview}>
                  <BsImage size="2em" color="MediumSeaGreen" />
                  <Box>{e.name}</Box>
                  <AiOutlineCloseCircle
                    size="2em"
                    color="tomato"
                    onClick={(event) => {
                      event.preventDefault();
                      setInterior((prev) => {
                        return prev.filter((item) => item != e);
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '50%', mx: 'auto', my: '5px' }}
              onClick={() => submitForm()}
            >
              List Car
            </Button>
          </Box>
        </form>
      </Box>
    );
  };

  switch (step) {
    case 1:
      return renderStepOne();
    case 2:
      return renderStepTwo();
    case 3:
      return renderStepThree();
    case 4:
      return renderStepFour();
    case 5:
      return renderStepFive();
    case 6:
      return renderStepSix();
  }
}

const stepOneFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: {
    xs: '100vw',
    sm: '50vw',
    md: '30vw',
  },
};

const stepOneWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const textField = {
  m: '10px',
};

const halfSizedInput = {
  display: 'flex',
};

const uploadText = { position: 'absolute', top: '35%', left: '25%', textAlign: 'center' };

const stepHeading = { mx: 'auto', fontSize: '20px', mb: '30px' };

const imageNamePreview = {
  display: 'flex',
  width: '70%',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid gray',
  borderRadius: '20px',
  p: '15px',
};

const imageNamePreviewWrap = {
  display: 'flex',
  justifyContent: 'center',
  my: '10px',
  flexDirection: 'column',
  alignItems: 'center',
};

const nextButton = { width: '50%', mx: 'auto', my: '10px' };

const OutlinedInputStyle = { display: 'flex', height: '40vh' };

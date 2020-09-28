import Authentication from '../middlewares/authentication';
import RayController from '../controllers/RayController';


const { verifyTokenViaSocket } = Authentication;

const captureRayFromPC = (socket) => {
  socket.on('rayFromPC', async (result) => {
    const response = await verifyTokenViaSocket(result.token);
    if (response === 'token error') {
      return socket.emit('responseToPC', response);
    }
    const finalResponse = await RayController.caputeRayFromPC(response.id, result);
    if(finalResponse === 'success') {
      return socket.emit('responseToPC', finalResponse);
    } else {
      return socket.emit('responseToPC', finalResponse);
    }
  });
};

export default captureRayFromPC;

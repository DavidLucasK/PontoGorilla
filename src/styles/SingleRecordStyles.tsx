import { StyleSheet } from 'react-native';

const SingleRecordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343a40',
  },
  main: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ffffff',
    marginBottom: -10,
  },
  subtitle: {
    fontSize: 20,
    color: '#CCC',
    marginBottom: 20,
    fontFamily: 'Poppins_500Medium',
  },
  detailStand: {
    width: 3,
    height: 480,
    borderRadius: 10,
    backgroundColor: '#509e2f',
    marginRight: 35,
},
bottom: {
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
},
  hourText: {
    fontSize: 24,
    color: '#5fbd37', // Cor verde para o horário clicado
    fontFamily: 'Poppins_600SemiBold',
  },
  detailContainer: {
    width: '100%',
    backgroundColor: 'rgb(249, 255, 193)',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 85,
  },
  detail: {
    fontSize: 12,
    marginBottom: 10,
    color: '#333333',
    fontFamily: 'Poppins_400Regular',
  },
  borderDetail: {
    borderBottomColor: '#00000032',
    borderBottomWidth: 2,
    borderStyle: 'dotted',
    marginVertical: 10,
    width: '90%',
  },
  detail1: {
    color: '#DDD',
    fontFamily: 'Poppins_400Regular',
  },
  detail2: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 15,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
  },
  back: {
    color: '#FFF',
    backgroundColor: '#509e2f',
    width: 'auto',
    alignSelf: 'flex-start',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  triangleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tornBottom: {
    width: '100%',
    position: 'absolute',
    bottom: -10,
    left: 5,
    right: 0,
    height: 40, // Altura do efeito de rasgo
    borderRadius: 0,
    overflow: 'hidden',
    zIndex: 99,
  },
  tornBottomTriangle: {
    position: 'absolute',
    bottom: 0,
    left: -10,
    right: 0,
    height: 40,
    backgroundColor: 'transparent',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderTopWidth: 50,
    borderTopColor: '#343a40',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ rotate: '180deg' }],
  },
});

export default SingleRecordStyles;

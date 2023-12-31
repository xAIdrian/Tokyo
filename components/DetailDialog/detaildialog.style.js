/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dialogContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dialogTitleContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dialogTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dialogContentContainer: {
    padding: 16,
    flexDirection: 'column',
    flex: 1,
  },
  dialogContentText: {
    fontSize: 16,
    color: '#666',
  },
  dialogFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  dialogButtonContainer: {
    marginLeft: 8,
  },
  dialogButtonText: {
    fontSize: 16,
    color: '#007aff',
  },
});

export default styles;

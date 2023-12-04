/*
 * Oligarch Ventures, LLC.
 * Version: 1.0.0
 * Author: Adrian Mohnacs
 * Copyright (c) 2023 
 * All rights reserved. Unauthorized copying or reproduction of this file is prohibited.
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import styles from './detaildialog.style';

const DetailDialog = ({
  isVisible,
  title,
  content,
  cancelText,
  confirmText,
  cancelAction,
  confirmAction
}) => {
  return (
    <Dialog
      dialogStyle={styles.dialogContainer}
      visible={ isVisible}
    >
      <DialogTitle
        style={styles.dialogTitleContainer}
        textStyle={styles.dialogTitleText}
        title={ title }
      />

      <DialogContent style={styles.dialogContentContainer}>
        <ScrollView>
          <Text style={styles.dialogContentText}>{ content }</Text>
        </ScrollView>
      </DialogContent>

      <DialogFooter style={styles.dialogFooterContainer}>
        {
          cancelText === '' ?
          <View /> :
          <DialogButton
            style={styles.dialogButtonContainer}
            textStyle={styles.dialogButtonText}
            text= { cancelText }
            onPress={ cancelAction }
          />
        }
        <DialogButton
          style={styles.dialogButtonContainer}
          textStyle={styles.dialogButtonText}
          text= { confirmText }
          onPress={ confirmAction }
        />
      </DialogFooter>
    </Dialog>
  );
}

export default DetailDialog;

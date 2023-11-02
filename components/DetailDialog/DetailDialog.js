import React from 'react';
import { View, Text } from 'react-native';
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
        <Text style={styles.dialogContentText}>{ content }</Text>
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

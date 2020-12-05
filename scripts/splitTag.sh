echo $BITBUCKET_TAG
IFS=@ read var1 var2 var3 <<<${BITBUCKET_TAG}
echo 1 $var1
echo 2 $var2
echo 3 $var3

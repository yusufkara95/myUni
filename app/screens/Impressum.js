import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function Impressum() {
    return (
        <ScrollView style={styles.viewBody}>
            <Text style={styles.title}>Angaben gem. § 5 TMG</Text>
            <Text style={styles.text}>Yusuf Kara</Text>
            <Text style={styles.text}>Matrikelnummer: 10009824</Text>
            <Text style={styles.text}>E-Mail: yusuf.kara@stud.hs-ruhrwest.de</Text>
                <View style={{
                    marginBottom: 20
                }}>
                </View>
                <Text style={styles.title}>Haftung für Inhalte</Text>
                <Text style={styles.text}>Alle Inhalte unseres Internetauftritts wurden mit größter Sorgfalt und nach bestem Gewissen erstellt. 
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntniserlangung einer konkreten Rechtsverletzung möglich. 
                Bei Bekanntwerden von den o.g. Rechtsverletzungen werden wir diese Inhalte unverzüglich entfernen.</Text>
                <View style={{
                    marginBottom: 20
                }}>
                </View>
                <Text style={styles.title}>Urheberrecht</Text>
                <Text style={styles.text}>Die auf unserer Webseite veröffentlichen Inhalte und Werke unterliegen dem deutschen Urheberrecht (http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf) . 
                Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung des geistigen Eigentums in ideeller und materieller Sicht des Urhebers außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Urhebers i.S.d. Urhebergesetzes (http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf ). 
                Downloads und Kopien dieser Seite sind nur für den privaten und nicht kommerziellen Gebrauch erlaubt. 
                Sind die Inhalte auf unserer Webseite nicht von uns erstellt wurden, sind die Urheberrechte Dritter zu beachten. 
                Die Inhalte Dritter werden als solche kenntlich gemacht. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. 
                Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte unverzüglich entfernen.</Text>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        padding: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    text: {
        fontSize: 14
    }
})


